const { test, expect } = require('@playwright/test');

test('First Playwright Test', async ({ page }) => {

    const productName = 'Sauce Labs Backpack';
    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    // await page.locator('#add-to-cart-sauce-labs-backpack').click();
    // await page.locator('#login-button').click();
    const products = await page.locator('.inventory_item_description');
    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('#add-to-cart-sauce-labs-backpack') === productName) {
            await products.nth(i).locator('#add-to-cart-sauce-labs-backpack').click();
            break;
        }
    }
    await page.pause();


    // const cartCount = await page.locator('.shopping_cart_link').waitFor({ state: 'visible' });
    // expect(Number(cartCount)).toBe(count);
    // await page.pause();


});