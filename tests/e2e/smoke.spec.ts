import { test, expect } from "@playwright/test";

test("dashboard opens and exposes learning entry points", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "你好，今天想从哪里继续？" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "学习进度" })).toBeVisible();
  await expect(page.getByRole("link", { name: /继续学习/ }).first()).toBeVisible();
});
