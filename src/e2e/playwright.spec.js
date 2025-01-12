import test from "playwright/test";
import { expect } from "playwright/test";

test.describe("Queue Management Tests", () => {
  const baseUrl = "http://localhost:3000";

  test("Add message to queue and verify it was added", async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill("#putMessageQueue", "queue1");
    await page.fill("#putMessage", "Hello, Queue!");

    await page.click('button:has-text("Put message")');

    await expect(page.locator("#putMessageResponse")).toContainText(
      "message has been added to queue"
    );

    await page.fill("#queue", "queue1");
    await page.click('button:has-text("Get Queue")');

    await expect(page.locator("text=Messages:")).toContainText("Hello, Queue!");
  });

  test("Subscribe to queue, verify subscription, and consume message", async ({
    page,
  }) => {
    await page.goto(baseUrl);

    await page.fill("#subscribeName", "TestUser");
    await page.fill("#subscribeQueue", "queue1");
    await page.click('button:has-text("Subscribe")');

    await expect(page.locator("#subscribeResponse")).toContainText(
      "has subscribed to queue"
    );

    await page.fill("#queue", "queue1");
    await page.click('button:has-text("Get Queue")');

    await expect(page.locator("text=Subscribers:")).toContainText("TestUser");

    await page.fill("#consumeName", "TestUser");
    await page.fill("#consumeQueue", "queue1");
    await page.click('button:has-text("Consume")');
    await expect(page.locator("#consumeResponse")).toContainText(
      "Hello, Queue!"
    );

    await page.fill("#queue", "queue1");
    await page.click('button:has-text("Get Queue")');
    await expect(page.locator("text=Messages:")).toContainText("{}");
  });
});
