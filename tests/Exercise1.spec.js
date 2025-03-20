const {test,expect} = require("@playwright/test");
import LoginE1 from "./pageobjects/LogInE1"


test("Excercise",async({page})=>
    {
        const logInPage = new LoginE1(page);
       
        await page.goto("https://www.saucedemo.com/");
        await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
        await logInPage.valigLogIn("standard_user");
        await logInPage.valigLogInPass("secret_sauce");
        await logInPage.clickLogBtn();
        await expect(page).toHaveURL(/.*inventory.html/);
        
    })


test("Excercise 2",async({page})=>
    {

        await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");
        await page.getByRole('button', { name: 'Add Element' }).click();
        await expect(page.getByRole('button', { name: 'Add Element' })).toBeVisible();

    })


test("Excercise 3",async({page})=>
    {
    
        await page.goto("https://the-internet.herokuapp.com/checkboxes");
        await page.locator("#checkboxes > input:first-child").check();
        await expect (page.locator("#checkboxes > input:first-child")).toBeChecked();
        await page.locator("#checkboxes > input:last-child").uncheck();
        await expect (page.locator("#checkboxes > input:last-child")).not.toBeChecked();

    })


test("Excercise 4",async({page})=>
    {
    
        await page.goto("https://the-internet.herokuapp.com/dropdown");
        await page.locator("#dropdown").selectOption({value : "1"});
        await expect (page.locator("#dropdown")).toContainText('Option 1');
        await page.locator("#dropdown").selectOption({value : "2"});
        await expect (page.locator("#dropdown")).toContainText('Option 2');

    })



test("For Loop Excercise", async({page})=>  {


    for (let i = 0; i < 5; i++) {

        console.log("Number : ", i);
        
    }

})



test("For loop excercise for loop buttons", async({page})=> {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const buttons = page.locator('button');  
    const buttonCount  = await buttons.count();
    

    for ( let i = 0; i < buttonCount; i++) {

        const buttonText = await buttons.nth(i).textContent();  
        console.log(`Button ${i + 1}:`, buttonText).click(); 

    }


})



test ("Ad to Cart for loop", async({page})=> {

    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    const addToCartButtons = page.locator('.btn_primary.btn_inventory'); 
    const buttonCount = await addToCartButtons.count();

    for (let i = 0; i < buttonCount; i++) {  
        await addToCartButtons.nth(i).click();
    }

    const cartCount = await page.locator('.shopping_cart_badge').textContent();

    await page.pause();
})

test('Add all items to cart on SauceDemo', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/v1/index.html');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const addToCartButtons = await page.locator('.btn_inventory').all();
    for (const button of addToCartButtons) {
        await button.click();
    }

    await expect(page.locator('.shopping_cart_badge')).toHaveText(String(addToCartButtons.length));
});


test('Add all items to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/v1/index.html');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const danilo = await page.locator('.inventory_item_name').count();
    const products = await page.locator('.inventory_item_name').all();
    const text = 'Sauce Labs Backpack';
    

    for (let i = 0; i < danilo; i++) {

        console.log(await products[i].textContent());

        if (await products[i].textContent() == text) {
            await products[i].click()
            break;
        }

        
    }
    await page.locator('.btn_primary').click();
    await page.locator('.bm-burger-button').click();
    await page.locator('#inventory_sidebar_link').click();
    await page.pause();


});


test('Iterate through every item and click add to cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/v1/index.html');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const cartBtn = await page.locator('.btn_primary').all();

    for (let i = 0; i < cartBtn.length; i++) {

        await cartBtn[i].click(); //prints every add to cart btn
        
    }
 
    // await page.pause'

});