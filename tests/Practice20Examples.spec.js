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


test.beforeEach(async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    logIn = new LogInPractice(page);
    prodPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    selectProduct = new iterateThroughProductsAndSelectItem(page);

})


test("1 - Log in with valid credentials.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await logIn.LogOut();

})


test("2 - Log in with invalid credentials and check error message.", async ({ page }) => {

    await logIn.LogInPage(data.invalidPassword, data.invalidPassword);
    await logIn.verifyErrorMessage(data.logInErrorMsg);
})

test("3 - Add the first product to the cart and verify the cart count.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.clickAddToCartBtn.nth(1).click();
    await logIn.verifyCartCount(1);

})

test("4 - Remove a product from the cart and verify it is removed.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.clickAddToCartBtn.nth(0).click();
    await prodPage.removeBtn.nth(0).click();
    await prodPage.verifyInvisibleCartBadge();
    await logIn.LogOut();

})

test("5 - Log out from the application.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})


test("6 - Verify sorting functionality (A-Z).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.verifyAtoZDropdown(data.verifyAtoZ);
    await logIn.LogOut();

})

test("7 - Verify sorting functionality (Z-A).", async ({ page }) => {


    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.sortingZtoA();
    await prodPage.verifyAtoZDropdown(data.verifyZtoA);
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})


test("8 - Verify sorting by price (low to high).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.sortingLowHigh();
    await prodPage.verifyAtoZDropdown(data.priceHighLow);
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})

test("9 - Verify sorting by price (high to low).", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.sortingHighLow();
    await prodPage.verifyAtoZDropdown(data.priceLowHigh);
    // await expect(page.locator('.active_option')).toHaveText('Price (low to high)');
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})


test("10 - Add multiple products to the cart and verify cart count.", async ({ page }) => {
    //This test is similar to test #16
    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.addToCartBtn(); //Adding 3 products to cart
    await prodPage.verifyShoppingCartBadge('3');
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})

test("11 - Iterate through all products and print their names.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.iterateThroughProducts();
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})


test("12 - Select a specific product based on its name and add it to the cart.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await selectProduct.iterateAndSelect(data.itemNameBackpack);
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})

test("13 - Select a specific product based on its name and add it to the cart.", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.clickAddToCartBtn.nth(0).click();
    await prodPage.verifyShoppingCartBadge('1');
    await page.reload();
    await prodPage.verifyShoppingCartBadge('1');
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})

test("14 - Complete the checkout process successfully.", async ({ page }) => {

    // cartPage.continueBtn.click()
    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.clickAddToCartBtn.nth(0).click();
    await prodPage.verifyShoppingCartBadge('1');
    await prodPage.cartBtn.click();
    await cartPage.clickCheckout.click();
    await cartPage.checkoutPersonalInfo(data.validName, data.validSurname, data.validZip);
    await cartPage.clickContinueBtn.click();
    await cartPage.clickFinishBtn.click();
    await prodPage.verifyCompleteHeader(data.verifyHeaderText)
    await cartPage.clickBackHomeBtn.click();
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})

test("15 - Verify that checkout fails when required fields are empty", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);
    await prodPage.clickAddToCartBtn.nth(0).click();
    await prodPage.verifyShoppingCartBadge('1');
    await prodPage.cartBtn.click();
    await cartPage.clickCheckout.click();
    await cartPage.clickContinueBtn.click();
    await prodPage.verifyErrorMsgContainer(data.verifyErrorMsg);
    await logIn.LogOut();
    await prodPage.verifySwagLabsTitle(data.titleSwagLabs);

})


test("16 - Add dinamically X amount of products into cart and assert", async ({ page }) => {

    await logIn.LogInPage(data.validUsername, data.validPassword);
    await logIn.verifyProductTitle(data.titleProducts);

    const addToCartButtons = page.locator('.btn_primary');
    const numberOfProductsToAdd = 3;

    for (let i = 0; i < numberOfProductsToAdd; i++) {

        await addToCartButtons.nth(i).click();

    }

    const cartIcon = page.locator('.shopping_cart_badge');
    await expect(cartIcon).toHaveText(`${numberOfProductsToAdd}`);

    console.log(`You have succesfully added ${numberOfProductsToAdd} of products in cart`)

})
