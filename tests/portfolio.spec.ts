import { expect, test } from "@playwright/test";

test("scrolling at the entry screen reveals the hero, and the intro can be skipped after refresh", async ({ page }) => {
  await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Portfolio Introduction" });
  await expect(intro).toBeVisible();
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeFocused();
  await expect(intro.getByRole("button", { name: "Tap to enter" })).toBeEnabled();
  await page.mouse.move(300, 240);
  await page.mouse.wheel(0, 400);
  await expect(intro).toHaveCount(0);
  await expect(page.locator("#portfolio-heading")).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  await page.reload();
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator("#portfolio-heading")).toBeFocused();
});

test("a deep link opens at its section with reduced motion", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  await expect(page.getByRole("dialog", { name: "Portfolio Introduction" })).toHaveCount(0);
  await expect.poll(() => page.locator("#contact").evaluate((section) => Math.round(section.getBoundingClientRect().top))).toBe(80);
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);

  const résumé = await request.get("/resume.pdf");
  expect(résumé.ok()).toBeTruthy();
  expect(résumé.headers()["content-type"]).toContain("application/pdf");

  const anchorIds = await page.locator('main a[href^="#"], nav a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")!.slice(1)).filter((id) => id && !document.getElementById(id))
  );
  expect(anchorIds).toEqual([]);
});

test("the portrait scrolls with the hero without parallax", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click();

  const portraitColumn = page.locator(".hero-portrait-frame").locator("..");
  const offset = () => portraitColumn.evaluate((element) =>
    element.getBoundingClientRect().top - element.closest("section")!.getBoundingClientRect().top
  );
  const initialOffset = await offset();
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(250);
  expect(await offset()).toBeCloseTo(initialOffset);
  await expect(portraitColumn).toHaveCSS("transform", "none");
});

test("desktop project depth reverses and covered links can receive visible focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#projects");
  await page.getByRole("button", { name: "Skip intro" }).click();

  const section = page.locator("#projects");
  await expect(section).toHaveAttribute("data-stacked", "true");
  const cards = section.locator("article");
  await expect(cards).toHaveCount(7);
  const preview = cards.first().locator("[data-scroll]");
  const previewTransform = () => preview.evaluate((element) => element.style.transform);
  await expect.poll(previewTransform).toContain("translate3d");
  const initialTransform = await previewTransform();
  await page.mouse.wheel(0, 250);
  await expect.poll(previewTransform).not.toBe(initialTransform);

  await cards.nth(2).scrollIntoViewIfNeeded();
  await expect.poll(() => cards.first().evaluate((card) => Number(card.style.getPropertyValue("--project-covered")))).toBeGreaterThan(0.5);

  const firstLink = cards.first().getByRole("link").first();
  await page.keyboard.press("Tab");
  await firstLink.focus();
  await expect(firstLink).toBeFocused();
  await expect.poll(() => firstLink.evaluate((link) => {
    const { x, y, width, height } = link.getBoundingClientRect();
    return link.contains(document.elementFromPoint(x + width / 2, y + height / 2));
  })).toBe(true);

  await section.evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect.poll(() => cards.first().evaluate((card) => Number(card.style.getPropertyValue("--project-covered")))).toBe(0);
});

test("mobile keeps projects in flow and supports both themes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects");

  const section = page.locator("#projects");
  await expect(section).toHaveAttribute("data-stacked", "false");
  const lastProject = section.locator("article").last();
  await expect(lastProject).toHaveCSS("position", "relative");
  await lastProject.scrollIntoViewIfNeeded();
  await expect(lastProject.locator("img")).toBeInViewport();
  await expect.poll(() => lastProject.locator("img").evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: /Experience/ }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience h2")).toBeFocused();

  const hasNoOverflow = () => page.evaluate(() => document.documentElement.scrollWidth === innerWidth);
  expect(await hasNoOverflow()).toBe(true);
  await page.getByRole("button", { name: "Switch to Nordic Night dark mode" }).click();
  await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  expect(await hasNoOverflow()).toBe(true);
});
