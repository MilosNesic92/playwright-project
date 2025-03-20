const { test, expect } = require('@playwright/test');
import loginPage from './pageobjects/LoginAtoZ';
import Checkoutinfo from './pageobjects/CheckoutInfo';
const data = require("../test-data/data.json"); 



test("Valid Login and out - Practice 1", async ({ page }) => {

    const login = new loginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await login.validLogIn(data.validUsername, data.validPassword);
    await expect(page.locator('.title')).toHaveText('Products');
    await login.clickBurgerButton();
    await login.clickLogout();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test("Invalid log in - practice 2", async ({ page }) => {

    const invalidLogin = new loginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await invalidLogin.validLogIn(data.invalidUsername, data.invalidPassword);
    await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');

})


test("Changde dropdown and asser, then log out - Practice 3", async ({ page }) => {

    const changeDropdown = new loginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await changeDropdown.validLogIn(data.validUsername, data.validPassword);
    await expect(page.locator('.active_option')).toHaveText('Name (A to Z)');
    const lohi = 'select.product_sort_container';
    await page.selectOption(lohi, { value: 'lohi' });
    await expect(page.locator('.active_option')).toHaveText('Price (low to high)');
    await changeDropdown.clickBurgerButton();
    await changeDropdown.clickLogout();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test("Iterate through products - Parctice 3", async ({ page }) => {

    const iterate = new loginPage(page);

    await page.goto('https://www.saucedemo.com/');
    await iterate.validLogIn(data.validUsername, data.validPassword);

    const productClass = page.locator('.inventory_item_name');
    const onesie = 'Sauce Labs Onesie';
    const addtoCartBtn = page.locator('.btn_primary');

    for (let i = 0; i < await productClass.count(); i++) {

        const iterateProducts = productClass.nth(i);
        const printProducts = await iterateProducts.textContent();

        if (printProducts === onesie) {

            await addtoCartBtn.nth(i).click();
            console.log(`You have added ${onesie} to the cart.`)
            break;

        }

    }

    await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    await iterate.clickBurgerButton();
    await iterate.clickLogout();

})


test("Check if correct product is added to cart and log out - practice 4", async ({ page }) => {

    const checkCart = new loginPage(page);
    const checkout = new Checkoutinfo(page);

    await page.goto('https://www.saucedemo.com/');
    await checkCart.validLogIn(data.validUsername, data.validPassword);
    await page.locator('#add-to-cart-sauce-labs-onesie').click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Onesie');
    await page.locator('#checkout').click();
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await checkout.personalInfo(data.validNamename, data.validSurname, data.validZip);
    await checkout.clickContinueBtn();
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await checkout.clickFinishBtn();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await checkCart.clickBurgerButton();
    await checkCart.clickLogout();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})