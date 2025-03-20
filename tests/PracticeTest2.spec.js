const { test, expect } = require('@playwright/test');


test('First Playwright Test', async ({ page }) => 
{
    await page.goto("https://practicesoftwaretesting.com/");
    console.log(await page.locator(".card-title").nth(0));

});