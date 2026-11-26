const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9555;
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-aud-'));

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + tmpDir,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  // Poll until debugging port is ready
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      await new Promise((res, rej) => {
        const req = http.get(`http://127.0.0.1:${port}/json/list`, r => {
          if (r.statusCode === 200) res();
          else rej();
        });
        req.on('error', rej);
      });
      ready = true;
      break;
    } catch {}
  }

  if (!ready) {
    throw new Error('Chrome did not open debugging port in time');
  }

  const pages = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = pages.find(p => p.type === 'page') || pages[0];
  const WebSocket = require('ws');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

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

  await send('Page.navigate', { url: 'http://localhost:59607/' });
  await new Promise(r => setTimeout(r, 2200)); // wait for preloader reveal

  // Collect DOM inventory and health metrics
  const evaluation = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll('section')).map(s => ({
          id: s.id,
          h2: s.querySelector('h2, h1, h3')?.innerText?.trim() || '',
          visible: s.offsetHeight > 0
        }));

        const links = Array.from(document.querySelectorAll('a[href]')).map(a => ({
          text: a.innerText.trim().slice(0, 40),
          href: a.getAttribute('href'),
          target: a.getAttribute('target') || '',
          rel: a.getAttribute('rel') || ''
        }));

        const projects = Array.from(document.querySelectorAll('#projects button[role="tab"]')).map(t => t.innerText.trim());

        return {
          sections,
          totalLinks: links.length,
          externalLinks: links.filter(l => l.href.startsWith('http')),
          projectTabs: projects,
          cursorClass: document.documentElement.className,
          bodyScrollWidth: document.body.scrollWidth,
          windowInnerWidth: window.innerWidth
        };
      })()
    `,
    returnByValue: true
  });

  fs.writeFileSync('docs/qa/portfolio-audit-report.json', JSON.stringify(evaluation.result.value, null, 2));
  console.log('Audit JSON written to docs/qa/portfolio-audit-report.json');

  // Capture clean section screenshots at 1440 & 390
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
  
  // Hero
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await new Promise(r => setTimeout(r, 500));
  let shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/qa/review-hero-1440.png', Buffer.from(shot.data, 'base64'));

  // Selected Works
  await send('Runtime.evaluate', { expression: `document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });` });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/qa/review-projects-1440.png', Buffer.from(shot.data, 'base64'));

  // Contact
  await send('Runtime.evaluate', { expression: `document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant', block: 'start' });` });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/qa/review-contact-1440.png', Buffer.from(shot.data, 'base64'));

  // Mobile Hero & Projects
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
  await new Promise(r => setTimeout(r, 500));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/qa/review-hero-390.png', Buffer.from(shot.data, 'base64'));

  await send('Runtime.evaluate', { expression: `document.querySelector('#projects')?.scrollIntoView({ behavior: 'instant', block: 'start' });` });
  await new Promise(r => setTimeout(r, 600));
  shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('docs/qa/review-projects-390.png', Buffer.from(shot.data, 'base64'));

  console.log('Captured review screenshots in docs/qa/');

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
