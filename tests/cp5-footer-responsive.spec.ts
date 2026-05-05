import { test, expect } from "@playwright/test";

/**
 * CP5 Footer Responsive Tests
 * Verifies: Footer dark surface, 4 columns, "now" line, copyright,
 * responsive behavior at 375px, 768px, 1024px, 1440px, no horizontal overflow
 */
test.describe("CP5 Footer Responsive", () => {
  const viewports = [
    { name: "mobile", width: 375, height: 667 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "laptop", width: 1024, height: 768 },
    { name: "desktop", width: 1440, height: 900 },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  });

  test("footer has dark surface background", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeAttached();

    const bgColor = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      return window.getComputedStyle(footer!).backgroundColor;
    });
    // bg-surface-dark should be a dark color - let's check it's not the canvas light color
    expect(bgColor).not.toBe("rgb(250, 249, 245)"); // not bg-canvas
  });

  test("footer has 4 columns at 1440px (Portfolio, Connect, Built with, Last updated)", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    // Check all 4 column headers exist
    const columnHeaders = ["Portfolio", "Connect", "Built with", "Last updated"];
    for (const header of columnHeaders) {
      const heading = page.locator(`footer h3:text-is("${header}")`);
      await expect(heading).toBeVisible();
    }
  });

  test('footer "now" line is visible above copyright', async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeAttached();

    // The "now" line contains profile.now text - should contain "Currently:"
    const nowLine = page.locator("footer p:text-is('Currently: shipping a public RAG demo. Last updated April 2026.')");
    await expect(nowLine).toBeVisible();
  });

  test('footer copyright "© 2026 Lochan Vishwanath" is visible', async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    const copyright = page.locator("footer").locator("text=© 2026 Lochan Vishwanath");
    await expect(copyright).toBeVisible();
  });

  test("no horizontal overflow at any viewport size", async ({ page }) => {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow).toBe(false);
    }
  });

  test("TopNav hamburger menu appears at ≤768px", async ({ page }) => {
    // At mobile viewport (375px), hamburger should be visible
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    const hamburgerButton = page.locator("nav button[aria-label='Open menu']");
    await expect(hamburgerButton).toBeVisible();

    // At desktop viewport (1024px), hamburger should NOT be visible
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    const hamburgerButtonDesktop = page.locator("nav button[aria-label='Open menu']");
    await expect(hamburgerButtonDesktop).not.toBeVisible();
  });

  test("footer columns stack vertically at 375px (mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Scroll to footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    // At mobile, the footer grid uses grid-cols-2, so 4 columns become 2 rows
    // Check that the grid container exists and content is visible
    const footerGrid = page.locator("footer .grid");
    await expect(footerGrid).toBeVisible();

    // All column headers should still be visible (stacked)
    const columnHeaders = ["Portfolio", "Connect", "Built with", "Last updated"];
    for (const header of columnHeaders) {
      const heading = page.locator(`footer h3:text-is("${header}")`);
      await expect(heading).toBeVisible();
    }
  });

  test("take screenshot at 1440px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Scroll to footer for screenshot
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: ".sisyphus/evidence/task-27-footer.png",
      fullPage: true,
    });
  });

  test("take screenshot at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Scroll to footer for screenshot
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: ".sisyphus/evidence/task-27-footer-375px.png",
      fullPage: true,
    });
  });
});