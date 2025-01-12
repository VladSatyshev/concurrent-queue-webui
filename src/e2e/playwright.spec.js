import test from "playwright/test";
import { expect } from "playwright/test";

test.describe("Queue Management Tests", () => {
  const baseUrl = "http://localhost:3000";

  test("Add message to queue and verify it was added", async ({ page }) => {
    // await page.evaluate(() => {
    //   window.alert = (message) => {
    //     document.body.setAttribute("data-alert-message", message);
    //   };
    // });

    await page.goto(baseUrl);

    // Fill in the PutMessageForm
    await page.fill("#putMessageQueue", "queue1");
    await page.fill("#putMessage", "Hello, Queue!");

    // Submit the form
    await page.click('button:has-text("Put message")');

    // Wait for alert and validate message
    const alertMessage = await page.waitForEvent("dialog");

    expect(alertMessage).toContain("message has been added");
    await alertMessage.dismiss();

    // Retrieve queue data to verify the message was added
    await page.fill("#queue", "queue1");
    await page.click('button:has-text("Get Queue")');

    // Verify the message appears in the queue details
    await expect(page.locator("text=Messages:")).toContainText("Hello, Queue!");
  });

  //   test("Subscribe to queue, verify subscription, and consume message", async ({
  //     page,
  //   }) => {
  //     // Navigate to the main page
  //     await page.goto(baseUrl);

  //     // Subscribe to the queue
  //     await page.fill("#name", "TestUser");
  //     await page.fill("#queue", "TestQueue");
  //     await page.click('button:has-text("Subscribe")');

  //     // Wait for alert and validate subscription
  //     const alertMessage = await page.waitForEvent("dialog");
  //     expect(alertMessage.message()).toContain("Subscription added successfully");
  //     await alertMessage.dismiss();

  //     // Retrieve queue data to verify the subscription
  //     await page.fill("#queue", "TestQueue");
  //     await page.click('button:has-text("Get Queue")');

  //     // Verify the subscription appears in the queue details
  //     await expect(page.locator("text=Subscribers")).toContainText("TestUser");

  //     // Consume message
  //     await page.fill("#name", "TestUser");
  //     await page.fill("#queue", "TestQueue");
  //     await page.click('button:has-text("Consume")');

  //     // Verify message consumption logs (or alternative confirmation)
  //     await expect(page.locator("body")).toContainText(
  //       "Consumed message: Hello, Queue!"
  //     );
  //   });
});
