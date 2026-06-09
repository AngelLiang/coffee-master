import { test, expect } from "@playwright/test";

test.describe("首页", () => {
  test("页面标题正确", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/咖啡大师/);
  });

  test("页面包含导航栏", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByText("首页")).toBeVisible();
    await expect(page.getByText("博客")).toBeVisible();
    await expect(page.getByText("关于我们")).toBeVisible();
  });

  test("左侧作品介绍区域可见", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("作品介绍")).toBeVisible();
    await expect(page.getByText("HuggingFace 模型")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /HuggingFace/ })
    ).toHaveAttribute(
      "href",
      "https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
    );
  });

  test("右侧对话区域可见", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("AI 咖啡大师")).toBeVisible();
    await expect(page.getByPlaceholder("输入您的问题...")).toBeVisible();
    await expect(page.getByRole("button", { name: "发送" })).toBeVisible();
  });

  test("快捷示例按钮存在", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("快捷示例")).toBeVisible();
    await expect(page.getByText("咖啡太苦了怎么办？")).toBeVisible();
    await expect(page.getByText("手冲咖啡的水温建议")).toBeVisible();
    await expect(page.getByText("不同咖啡豆的风味特点")).toBeVisible();
  });

  test("点击快捷示例填入输入框", async ({ page }) => {
    await page.goto("/");
    const quickPrompt = page.getByText("咖啡太苦了怎么办？");
    await quickPrompt.click();
    const input = page.getByPlaceholder("输入您的问题...");
    await expect(input).toHaveValue("咖啡太苦了怎么办？");
  });

  test("Footer 可见且包含 HuggingFace 链接", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("HuggingFace 模型")).toBeVisible();
  });
});
