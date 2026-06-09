import { test, expect } from "@playwright/test";

test.describe("博客页面", () => {
  test("博客列表页可访问", async ({ page }) => {
    await page.goto("/blog/");
    await expect(page).toHaveTitle(/博客/);
    await expect(page.getByText("博客")).toBeVisible();
  });

  test("博客文章详情页可访问", async ({ page }) => {
    await page.goto("/blog/first-post/");
    await expect(page).toHaveTitle(/咖啡大师 v5 正式发布/);
    await expect(page.getByText("咖啡大师 v5 正式发布")).toBeVisible();
  });

  test("博客文章包含正确内容", async ({ page }) => {
    await page.goto("/blog/first-post/");
    await expect(page.getByText("模型亮点")).toBeVisible();
    await expect(page.getByText("技术特性")).toBeVisible();
    await expect(page.getByText("快速开始")).toBeVisible();
  });

  test("博客页面导航回列表", async ({ page }) => {
    await page.goto("/blog/first-post/");
    const backLink = page.getByText("返回博客列表");
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/.*blog.*/);
  });
});
