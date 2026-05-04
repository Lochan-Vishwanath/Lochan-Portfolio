import { test, expect } from "@playwright/test";

test.describe("Hero + About sections", () => {
  test("Hero section renders correctly at desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000");

    // H1 exists with correct text
    const h1 = page.locator("#hero h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Frontend engineer who ships AI.");

    // "AI" word is coral colored (#cc785c)
    const aiText = h1.locator("text=AI.");
    await expect(aiText).toHaveCSS("color", "rgb(204, 120, 92)");

    // Terminal renders (CodeWindow dark surface)
    const terminal = page.locator("#hero .bg-[#141413]");
    await expect(terminal).toBeVisible();

    // Availability pill visible
    const availabilityPill = page.locator("#hero").getByText("Available");
    await expect(availabilityPill).toBeVisible();

    // Two buttons visible
    await expect(page.getByRole("link", { name: "View projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download resume" })).toBeVisible();

    // Screenshot
    await page.screenshot({ path: ".sisyphus/evidence/task-24-hero-about.png" });
  });

  test("Hero + About sections render correctly at mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("http://localhost:3000");

    // Hero H1 visible
    const h1 = page.locator("#hero h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Frontend engineer who ships AI.");

    // "AI" word is coral colored
    const aiText = h1.locator("text=AI.");
    await expect(aiText).toHaveCSS("color", "rgb(204, 120, 92)");

    // Terminal hidden on mobile
    const terminal = page.locator("#hero .bg-\\[\\#141413\\]");
    await expect(terminal).not.toBeVisible();

    // Availability pill visible
    const availabilityPill = page.locator("#hero").getByText("Available");
    await expect(availabilityPill).toBeVisible();

    // Two buttons visible
    await expect(page.getByRole("link", { name: "View projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download resume" })).toBeVisible();

    // About section - two paragraphs visible
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
    const paragraphs = aboutSection.locator("p");
    await expect(paragraphs).toHaveCount(2);

    // About section centered with max-width
    const aboutContainer = aboutSection.locator(".max-w-xl");
    await expect(aboutContainer).toBeVisible();

    // Screenshot
    await page.screenshot({ path: ".sisyphus/evidence/task-24-hero-about-mobile.png" });
  });
});