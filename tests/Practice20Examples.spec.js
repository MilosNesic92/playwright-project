const { test, expect } = require('@playwright/test');
const exp = require('constants');
const data = require("../test-data/data.json");
import LogInPractice from "./pageobjects/practice20/LogInPage";
import ProductsPage from "./pageobjects/practice20/ProductsPage";
import CartPage from "./pageobjects/practice20/CartPage";
import iterateThroughProductsAndSelectItem from "./pageobjects/practice20/IterateThroughItems";

let logIn;
let prodPage;
let cartPage;
let selectProduct;


test.beforeEach(async ({page}) => {

    await page.goto("https://www.saucedemo.com/");
    logIn = new LogInPractice(page); 
    prodPage = new ProductsPage (page);
    cartPage = new CartPage(page);
    selectProduct = new iterateThroughProductsAndSelectItem(page);

})


test("1 - Log in with valid credentials.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await logIn.LogOut();

})


test("2 - Log in with invalid credentials and check error message.", async ({ page }) => {

    await logIn.LogInPage(data.invalidPassword,data.invalidPassword);
    await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test("3 - Add the first product to the cart and verify the cart count.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await page.locator('.btn_primary').nth(0).click();
    await expect(page.locator('.shopping_cart_link')).toHaveCount(1);

})

test("4 - Remove a product from the cart and verify it is removed.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await logIn.LogOut();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

})

test("5 - Log out from the application.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test("6 - Verify sorting functionality (A-Z).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await expect(page.locator('.active_option')).toHaveText('Name (A to Z)');
    await logIn.LogOut();

})

test("7 - Verify sorting functionality (Z-A).", async ({ page }) => {


    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await prodPage.sortingZtoA();
    await expect(page.locator('.active_option')).toHaveText('Name (Z to A)');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test("8 - Verify sorting by price (low to high).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await prodPage.sortingLowHigh();
    await expect.soft(page.locator('.active_option')).toHaveText('Price (high to low)');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test("9 - Verify sorting by price (high to low).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await prodPage.sortingHighLow();
    await expect(page.locator('.active_option')).toHaveText('Price (low to high)');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test("10 - Add multiple products to the cart and verify cart count.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await prodPage.addToCartBtn(); 
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test("11 - Iterate through all products and print their names.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);

    const itemName = page.locator('.inventory_item_name');

    for (let i = 0; i < await itemName.count(); i++) {

        const iterateProducts = itemName.nth(i);
        const printProducts = await iterateProducts.textContent();
        console.log(printProducts);

    }

    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test ("12 - Select a specific product based on its name and add it to the cart.", async({page})=> {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await selectProduct.iterateAndSelect(data.itemNameBackpack);
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test ("13 - Select a specific product based on its name and add it to the cart.", async({page})=> {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await page.locator('.btn_primary').nth(0).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.reload();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test ("14 - Complete the checkout process successfully.", async({page})=> {

    // cartPage.continueBtn.click()
    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await page.locator('.btn_primary').nth(0).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await prodPage.clickCartBtn();
    await cartPage.clickCheckoutBtn();
    await cartPage.checkoutPersonalInfo('Janko', 'Jankovic', '18000');
    await cartPage.clickContinueBtn();
    await cartPage.clickFinishBtn();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await page.locator('#back-to-products').click();
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test ("15 - Verify that checkout fails when required fields are empty", async({page})=> {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    await page.locator('.btn_primary').nth(0).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await prodPage.clickCartBtn();
    await cartPage.clickCheckoutBtn();
    await cartPage.clickContinueBtn();
    await expect(page.locator('.error-message-container')).toHaveText('Error: First Name is required');
    await logIn.LogOut();
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})


test ("16 - Add dinamically X amount of products into cart and assert", async({page})=> {

    await logIn.LogInPage(data.validUsername,data.validPassword);
    await logIn.verifyProductTitle(data.title);
    
    const addToCartButtons = page.locator('.btn_primary');
    const numberOfProductsToAdd = 5;

    for (let i = 0; i < numberOfProductsToAdd; i++) {

        await addToCartButtons.nth(i).click();

    }

    const cartIcon = page.locator('.shopping_cart_badge');
    await expect(cartIcon).toHaveText(`${numberOfProductsToAdd}`);

    console.log(`You have succesfully added ${numberOfProductsToAdd} of products in cart`)

})
