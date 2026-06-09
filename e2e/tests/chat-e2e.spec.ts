import { test, expect } from "@playwright/test";

test.describe("聊天功能 E2E", () => {
  test("发送消息后显示用户消息", async ({ page }) => {
    await page.goto("/");

    const input = page.getByPlaceholder("输入您的问题...");
    await input.fill("测试消息");
    await page.getByRole("button", { name: "发送" }).click();

    // 用户消息应该立即显示
    await expect(page.getByText("测试消息")).toBeVisible();
  });

  test("重置按钮清空聊天记录", async ({ page }) => {
    await page.goto("/");

    // 发送一条消息
    const input = page.getByPlaceholder("输入您的问题...");
    await input.fill("测试消息");
    await page.getByRole("button", { name: "发送" }).click();
    await expect(page.getByText("测试消息")).toBeVisible();

    // 点击重置
    await page.getByRole("button", { name: "重置" }).click();

    // 等待清空
    await expect(page.getByText("测试消息")).not.toBeVisible();
    await expect(page.getByText("欢迎来到咖啡大师")).toBeVisible();
  });

  test("发送按钮在输入为空时禁用", async ({ page }) => {
    await page.goto("/");

    const sendButton = page.getByRole("button", { name: "发送" });
    const input = page.getByPlaceholder("输入您的问题...");

    // 空输入时发送按钮应该禁用
    await input.fill("");
    await expect(sendButton).toBeDisabled();

    // 输入内容后应该启用
    await input.fill("你好");
    await expect(sendButton).toBeEnabled();
  });
});
