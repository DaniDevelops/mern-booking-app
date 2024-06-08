import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
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
});

test("should allow the user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await expect(page.getByRole("heading", { name: "Add Hotel" })).toBeVisible();

  //Fill in the Hotel details
  await page.locator("[name=name]").fill("test_user");
  await page.locator("[name=city]").fill("test_city");
  await page.locator("[name=country]").fill("test_country");
  await page
    .locator("[name=description]")
    .fill("This is just a dummy description for testing hotel functionality");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name=starRating]", "4");

  //Specifying the type
  await page.getByText("Budget").click();

  // adding facilities
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Spa").check();

  //adding the guests
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("4");

  //uploading images
  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "cabin-001.jpg"),
    path.join(__dirname, "files", "cabin-002.jpg"),
  ]);

  // Saving Hotel
  await page.getByRole("button", { name: "Save" }).click();

  // check for success by visiibility of toast message
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(
    page.getByText("Niagara Resort, nestled by the iconic Niagara Falls")
  ).toBeVisible();
  await expect(page.getByText("ChatGPT")).toBeVisible();
  await expect(page.getByText("British Columbia, Canada")).toBeVisible();
  await expect(page.getByText("Luxury")).toBeVisible();
  await expect(page.getByText("$100 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 3 children")).toBeVisible();
  await expect(page.getByText("4 star rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should be able to edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).click();

  await page.waitForSelector("[name=name]", { state: "attached" });
  await expect(page.locator("[name=name]")).toHaveValue("Niagra Resort");
  await page.locator("[name=name]").fill("Niagra Resort Deluxe");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel changes added!")).toBeVisible();

  await page.reload();
  await page.waitForSelector("[name=name]", { state: "attached" });
  await expect(page.locator("[name=name]")).toHaveValue("Niagra Resort Deluxe");
  await page.locator("[name=name]").fill("Niagra Resort");
  await page.getByRole("button", { name: "Save" }).click();
});
