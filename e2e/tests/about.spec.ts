import { test, expect } from "@playwright/test";

test.describe("关于我们页面", () => {
  test("页面可访问且标题正确", async ({ page }) => {
    await page.goto("/about/");
    await expect(page).toHaveTitle(/关于我们/);
    await expect(page.getByText("关于我们", { exact: true })).toBeVisible();
  });

  test("包含技术架构信息", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.getByText("技术架构")).toBeVisible();
    await expect(page.getByText("Python 3.11")).toBeVisible();
    await expect(page.getByText("FastAPI")).toBeVisible();
    await expect(page.getByText("Next.js 15")).toBeVisible();
  });

  test("包含模型信息", async ({ page }) => {
    await page.goto("/about/");
    await expect(page.getByText("模型信息")).toBeVisible();
    await expect(
      page.getByText("ynanxiu/qwen25-15b-coffee-v5-gguf")
    ).toBeVisible();
  });

  test("HuggingFace 链接可点击", async ({ page }) => {
    await page.goto("/about/");
    const hfLink = page.getByRole("link", { name: /HuggingFace/ });
    await expect(hfLink).toBeVisible();
    await expect(hfLink).toHaveAttribute(
      "href",
      "https://huggingface.co/ynanxiu/qwen25-15b-coffee-v5-gguf"
    );
  });
});
