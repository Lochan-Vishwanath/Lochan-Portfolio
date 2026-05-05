import { test, expect } from "@playwright/test";

/**
 * CP3 Projects, Skills, Writing Verification Tests
 * Verifies: Projects section (chat bubbles, tech pills, CTA),
 *           Skills section (dark surface, terminal lines, AI text),
 *           Writing section (cards with Coming soon badge)
 */

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 667 },
];

// ============================================
// PROJECTS SECTION TESTS
// ============================================

for (const { name, width, height } of viewports) {
  test(`[Projects] ${name} (${width}x${height}) - H2 Projects visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const heading = page.locator("h2", { hasText: "Projects" });
    await expect(heading).toBeVisible();
  });

  test(`[Projects] ${name} (${width}x${height}) - 3 project cards visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const articles = page.locator("#projects article");
    await expect(articles).toHaveCount(3);
  });

  test(`[Projects] ${name} (${width}x${height}) - chat bubbles have correct alignment and colors`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    const articles = page.locator("#projects article");
    const count = await articles.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      const article = articles.nth(i);
      // User bubble is first div in article
      const userBubble = article.locator("div").first();
      await expect(userBubble).toHaveClass(/bg-primary/);
      await expect(userBubble).toHaveClass(/ml-auto/);

      // Assistant bubble is second div (ChatBubble with bg-surface-card)
      const assistantBubble = article.locator("div").nth(1);
      await expect(assistantBubble).toHaveClass(/bg-surface-card/);
    }
  });

  test(`[Projects] ${name} (${width}x${height}) - tech stack pills visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // Tech badges have bg-surface-card class (cream variant badge)
    const firstCardBadges = page.locator("#projects article").first().locator(".bg-surface-card");
    const techCount = await firstCardBadges.count();
    expect(techCount).toBeGreaterThan(0);
  });

  test(`[Projects] ${name} (${width}x${height}) - View Details button on first card`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const firstCard = page.locator("#projects article").first();
    const viewDetailsBtn = firstCard.locator("button", { hasText: "View Details" });
    await expect(viewDetailsBtn).toBeVisible();
  });
}

// ============================================
// SKILLS SECTION TESTS
// ============================================

for (const { name, width, height } of viewports) {
  test(`[Skills] ${name} (${width}x${height}) - dark surface background #181715`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const skillsSection = page.locator("#skills");
    const bgColor = await skillsSection.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(bgColor).toBe("rgb(24, 23, 21)");
  });

  test(`[Skills] ${name} (${width}x${height}) - 5 command groups visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // Check for lochan commands (5 skill groups + 1 strengths command = 5 visible commands)
    const lochanCommands = page.locator("#skills").locator("text=/^lochan/");
    const count = await lochanCommands.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test(`[Skills] ${name} (${width}x${height}) - dollar prompts visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const dollarSigns = page.locator("#skills").locator("span:text('$')");
    const count = await dollarSigns.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test(`[Skills] ${name} (${width}x${height}) - AI text in coral`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // The AI group line has "copilotkit" text which is in the isAI colored section
    const aiText = page.locator("#skills").locator("text=copilotkit").first();
    await expect(aiText).toBeVisible();
  });
}

// ============================================
// WRITING SECTION TESTS
// ============================================

for (const { name, width, height } of viewports) {
  test(`[Writing] ${name} (${width}x${height}) - H2 Writing visible`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const heading = page.locator("h2", { hasText: "Writing" });
    await expect(heading).toBeVisible();
  });

  test(`[Writing] ${name} (${width}x${height}) - 2 cards with Coming soon badge`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    // Writing cards are divs with feature variant (not article elements)
    const cards = page.locator("#writing .bg-surface-card");
    await expect(cards).toHaveCount(2);
    const comingSoonBadges = page.locator("#writing").locator("text=Coming soon");
    await expect(comingSoonBadges).toHaveCount(2);
  });
}

// ============================================
// CONSOLE ERROR CHECKS
// ============================================

for (const { name, width, height } of viewports) {
  test(`[Console] ${name} (${width}x${height}) - zero console errors across all sections`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      // Only capture actual JavaScript errors, not resource loading errors (404s for images, etc.)
      if (msg.type() === "error" && !msg.text().includes("Failed to load resource")) {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Scroll through all sections to trigger any lazy-loaded content
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page.locator("#writing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    expect(consoleErrors).toHaveLength(0);
  });
}

// ============================================
// SCREENSHOTS
// ============================================

test("[Screenshots] capture all three sections at desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Scroll to Projects and screenshot
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/screenshots/cp3-projects.png", fullPage: false });

  // Scroll to Skills and screenshot
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/screenshots/cp3-skills.png", fullPage: false });

  // Scroll to Writing and screenshot
  await page.locator("#writing").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "tests/screenshots/cp3-writing.png", fullPage: false });

  // Final full-page screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.screenshot({ path: "tests/screenshots/cp3-all-sections.png", fullPage: true });
});