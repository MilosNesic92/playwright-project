const { test, expect } = require('@playwright/test');



test("Testing a for loop", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.getByRole('button', { name: '  ORDERS' }).click();

    const orderIdElements = page.locator('tbody tr');
    const orderIdName = orderIdElements.locator('th');
    const yourOrdersTitle = page.locator("div h1");
    await expect(yourOrdersTitle).toBeVisible();

    for (let i = 0; i < await orderIdName.count(); i++) {

        const rowOrderId = orderIdName.nth(i);
        const brojka = await rowOrderId.textContent();
        console.log(brojka);

    }

});

//Dodaj gore if else grananje






// test("Testing a for loop1", async ({ page }) => {

//     await page.goto("https://www.saucedemo.com");
//     await page.locator('#user-name').fill('standard_user');
//     await page.locator('#password').fill('secret_sauce');
//     await page.locator('#login-button').click();

//     const itemName = page.locator('.inventory_item_name');

//     for (let i = 0; i < await itemName.count(); i++) {

//         const print = await itemName.nth(i).textContent()

//         console.log(print);

//     }

// });

//Dodaj gore if else grananje