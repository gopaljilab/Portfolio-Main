const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9444;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-audit-'));
  
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tmpDir,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'http://localhost:59607/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  function getPages() {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }

  const pages = await getPages();
  const page = pages.find(p => p.type === 'page') || pages[0];
  const wsUrl = page.webSocketDebuggerUrl;

  const WebSocket = require('ws');
  const ws = new WebSocket(wsUrl);

  await new Promise(r => ws.on('open', r));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (data) => {
        const msg = JSON.parse(data);
        if (msg.id === msgId) {
          ws.off('message', handler);
          resolve(msg.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  // Let preloader finish
  await new Promise(r => setTimeout(r, 2000));

  // 1. Audit DOM Elements & Links
  const domAudit = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll('section')).map(s => ({
          id: s.id,
          h2: s.querySelector('h2')?.innerText || '',
          rect: s.getBoundingClientRect()
        }));

        const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
          text: a.innerText.trim(),
          href: a.getAttribute('href'),
          target: a.getAttribute('target'),
          rel: a.getAttribute('rel')
        }));

        const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
          text: b.innerText.trim().slice(0, 30),
          ariaLabel: b.getAttribute('aria-label') || '',
          id: b.id || ''
        }));

        const cursor = document.querySelector('div[aria-hidden="true"] div');

        return {
          sections,
          totalLinks: links.length,
          externalLinksCount: links.filter(l => l.href?.startsWith('http')).length,
          links: links.filter(l => l.href?.startsWith('http') || l.href?.startsWith('#') || l.href?.startsWith('mailto')),
          cursorActive: !!document.querySelector('.custom-cursor-active'),
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
        };
      })()
    `,
    returnByValue: true
  });

  fs.writeFileSync('docs/qa/audit-summary.json', JSON.stringify(domAudit.result.value, null, 2));
  console.log('DOM Audit Summary written to docs/qa/audit-summary.json');

  // 2. Capture Key Section Visuals (Desktop 1440 & Mobile 390)
  const sectionsToCapture = [
    { name: 'hero', selector: 'header, #home, section:first-of-type' },
    { name: 'projects-folder', selector: '#projects' },
    { name: 'skills', selector: '#skills' },
    { name: 'experience', selector: '#experience' },
    { name: 'contact', selector: '#contact' },
  ];

  // Capture Desktop
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });

  for (const s of sectionsToCapture) {
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${s.selector}');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`docs/qa/review-desktop-${s.name}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved docs/qa/review-desktop-${s.name}.png`);
  }

  // Capture Mobile
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  for (const s of sectionsToCapture) {
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${s.selector}');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`docs/qa/review-mobile-${s.name}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved docs/qa/review-mobile-${s.name}.png`);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
