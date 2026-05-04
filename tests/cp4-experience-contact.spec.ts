import { test, expect } from "@playwright/test";

/**
 * CP4 Experience & Contact Section Tests
 * Verifies: Experience timeline, expandable details, Contact cards, coral callout
 */

test.describe("CP4 Experience Section", () => {
  test("Experience section at desktop (1440 x 900)", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.locator("#experience").scrollIntoViewIfNeeded();

    // H2 'Experience' is visible
    const heading = page.locator("#experience-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Experience");

    // Timeline vertical line is visible (the hairline div with bg-hairline class)
    const timeline = page.locator("#experience .relative .bg-hairline");
    await expect(timeline).toBeVisible();

    // 2 role entries are visible
    const roles = page.locator("#experience h3").filter({ hasText: /·/ });
    await expect(roles).toHaveCount(2);

    // 'Show details' expandable works - expand and collapse
    const showDetails = page.locator("#experience summary").filter({ hasText: "Show details" });
    const count = await showDetails.count();
    expect(count).toBe(2);

    // Click to expand - details element should gain 'open' attribute
    const detailsElement = page.locator("#experience details").first();
    await showDetails.first().click();
    await page.waitForTimeout(100); // Wait for state change
    await expect(detailsElement).toHaveAttribute("open");

    // Click again to collapse - open attribute should be removed
    await showDetails.first().click();
    await page.waitForTimeout(100);
    await expect(detailsElement).not.toHaveAttribute("open");

    // take screenshot
    await page.screenshot({ path: `.sisyphus/evidence/task-26-ec-1440.png` });

    // filter out external resource errors (404s/400s from fonts/images)
    const appErrors = consoleErrors.filter(e => !e.includes("Failed to load resource"));
    expect(appErrors).toHaveLength(0);
  });

  test("Experience section at mobile (375 x 667)", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.locator("#experience").scrollIntoViewIfNeeded();

    // H2 'Experience' is visible
    const heading = page.locator("#experience-heading");
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText("Experience");

    // Timeline vertical line is visible (the hairline div with bg-hairline class)
    const timeline = page.locator("#experience .relative .bg-hairline");
    await expect(timeline).toBeVisible();

    // 2 role entries are visible
    const roles = page.locator("#experience h3").filter({ hasText: /·/ });
    await expect(roles).toHaveCount(2);

    // 'Show details' expandable works - expand and collapse
    const showDetails = page.locator("#experience summary").filter({ hasText: "Show details" });
    const count = await showDetails.count();
    expect(count).toBe(2);

    // Click to expand - details element should gain 'open' attribute
    const detailsElement = page.locator("#experience details").first();
    await showDetails.first().click();
    await page.waitForTimeout(100); // Wait for state change
    await expect(detailsElement).toHaveAttribute("open");

    // Click again to collapse - open attribute should be removed
    await showDetails.first().click();
    await page.waitForTimeout(100);
    await expect(detailsElement).not.toHaveAttribute("open");

    // take screenshot
    await page.screenshot({ path: `.sisyphus/evidence/task-26-ec-375.png` });

    // filter out external resource errors (404s/400s from fonts/images)
    const appErrors = consoleErrors.filter(e => !e.includes("Failed to load resource"));
    expect(appErrors).toHaveLength(0);
  });
});

test.describe("CP4 Contact Section", () => {
  test("Contact section at desktop (1440 x 900)", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(500); // Wait for any animations

    // H2 'Get in touch' is visible (use toBeInViewport as it may be beneath sticky nav)
    const heading = page.locator("#contact-heading");
    await expect(heading).toBeInViewport();
    await expect(heading).toHaveText("Get in touch");

    // 3 contact cards visible (Email, LinkedIn, GitHub)
    const emailCard = page.locator("#contact a[href^='mailto:']");
    await expect(emailCard).toBeVisible();

    const linkedinCard = page.locator("#contact a[href*='linkedin']");
    await expect(linkedinCard).toBeVisible();

    const githubCard = page.locator("#contact a[href*='github']");
    await expect(githubCard).toBeVisible();

    // Email link is mailto:
    const emailLink = page.locator("#contact a[href^='mailto:']");
    await expect(emailLink).toHaveAttribute("href", /^mailto:/);

    // Coral callout card with 'Or just ask the bot.' visible
    const coralCallout = page.locator("#contact").locator("text=Or just ask the bot.");
    await coralCallout.scrollIntoViewIfNeeded();
    await expect(coralCallout).toBeInViewport();

    // 'Open chat' button visible
    const openChatButton = page.locator("#contact button").filter({ hasText: /Open chat/ });
    await expect(openChatButton).toBeVisible();

    // take screenshot
    await page.screenshot({ path: `.sisyphus/evidence/task-26-ec-contact-1440.png` });

    // filter out external resource errors (404s/400s from fonts/images)
    const appErrors = consoleErrors.filter(e => !e.includes("Failed to load resource"));
    expect(appErrors).toHaveLength(0);
  });

  test("Contact section at mobile (375 x 667)", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.querySelector('#contact')?.scrollIntoView();
    });
    await page.waitForTimeout(500); // Wait for any animations

    // H2 'Get in touch' is visible (use toBeInViewport as it may be beneath sticky nav)
    const heading = page.locator("#contact-heading");
    await expect(heading).toBeInViewport();
    await expect(heading).toHaveText("Get in touch");

    // 3 contact cards visible (Email, LinkedIn, GitHub)
    const emailCard = page.locator("#contact a[href^='mailto:']");
    await expect(emailCard).toBeVisible();

    const linkedinCard = page.locator("#contact a[href*='linkedin']");
    await expect(linkedinCard).toBeVisible();

    const githubCard = page.locator("#contact a[href*='github']");
    await expect(githubCard).toBeVisible();

    // Email link is mailto:
    const emailLink = page.locator("#contact a[href^='mailto:']");
    await expect(emailLink).toHaveAttribute("href", /^mailto:/);

    // Coral callout card with 'Or just ask the bot.' visible
    const coralCallout = page.locator("#contact").locator("text=Or just ask the bot.");
    await coralCallout.scrollIntoViewIfNeeded();
    await expect(coralCallout).toBeInViewport();

    // 'Open chat' button visible
    const openChatButton = page.locator("#contact button").filter({ hasText: /Open chat/ });
    await expect(openChatButton).toBeVisible();

    // take screenshot
    await page.screenshot({ path: `.sisyphus/evidence/task-26-ec-contact-375.png` });

    // filter out external resource errors (404s/400s from fonts/images)
    const appErrors = consoleErrors.filter(e => !e.includes("Failed to load resource"));
    expect(appErrors).toHaveLength(0);
  });
});
