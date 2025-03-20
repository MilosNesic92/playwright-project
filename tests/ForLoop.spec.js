const { test, expect } = require("@playwright/test");



test("For Loop practice 1", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const productName = await page.locator('.inventory_item_name').all();
    const name = 'Sauce Labs Bolt T-Shirt';

    for (let i = 0; i < productName.length; i++) {

        await productName[i].textContent();

        if (await productName[i].textContent() === name) {
            await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

        }

    }

    await page.locator('#shopping_cart_container').click();

    // await page.pause();

})



test("For Loop iterate and add to cart all of the buttons", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const products = await page.locator('.inventory_item_description').all();
    const addBtn = 'Add to cart';
    const cartBtn = await page.locator('.btn_primary');
    const productsInCart = await page.locator('.btn_primary');


    for (let i = 0; i < products.length; i++) {

        const productText = await products[i].locator('.btn_primary').textContent();

        if (productText.trim() === addBtn) {
            await products[i].locator('.btn_primary').click();
        }



    }

    expect(productsInCart.length).toBe(products.length);

    await page.pause();


})


test("For Loop iterate and add to cart all of the buttons-Copilot", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const products = await page.locator('.inventory_item_description').all();
    const addBtn = 'Add to cart';
    let productsInCartCount = 0;

    for (let i = 0; i < products.length; i++) {
        const productText = await products[i].locator('.btn_primary').textContent();

        if (productText.trim() === addBtn) { 
            await products[i].locator('.btn_primary').click();
            productsInCartCount++; // Increment the count for each product added to cart
        }
    }

    // Verify if the number of products in the cart matches the number of iterated divs
    expect(productsInCartCount).toBe(products.length);


})