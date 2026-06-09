import { test, expect } from "@playwright/test";

test.describe("导航功能", () => {
  test("从首页导航到博客", async ({ page }) => {
    await page.goto("/");
    await page.getByText("博客").first().click();
    await expect(page).toHaveURL(/.*blog.*/);
  });

  test("从首页导航到关于我们", async ({ page }) => {
    await page.goto("/");
    await page.getByText("关于我们").first().click();
    await expect(page).toHaveURL(/.*about.*/);
  });

  test("从博客返回首页", async ({ page }) => {
    await page.goto("/blog/");
    await page.getByText("咖啡大师").first().click();
    await expect(page).toHaveURL("/");
  });

  test("移动端菜单可展开", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // 移动端应该有汉堡菜单
    const menuButton = page.locator("nav button");
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // 菜单项应该可见
    await expect(page.getByText("首页")).toBeVisible();
    await expect(page.getByText("博客")).toBeVisible();
    await expect(page.getByText("关于我们")).toBeVisible();
  });
});
