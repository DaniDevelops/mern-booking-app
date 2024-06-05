import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // go to sign in page
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill in the input fields
  await page.locator("[name=email]").fill("name@example.com");
  await page.locator("[name=password]").fill("password123");

  // sign in
  await page.getByRole("button", { name: "Login" }).click();

  // check for redirects
  await expect(page.getByText("You have successfully signed in")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `name${
    Math.floor(Math.random() * 90000) + 10000
  }@example.com`;
  await page.goto(UI_URL);

  // go to sign in page
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create An Account" })
  ).toBeVisible();

  // fill in the input fields
  await page.locator("[name=firstName]").fill("test_jane");
  await page.locator("[name=lastName]").fill("test_doe");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  // create account
  await page.getByRole("button", { name: "Create Account" }).click();

  // check for redirects
  await expect(page.getByText("User registration successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
