const { test, expect } = require('@playwright/test');


test('Practice Test', async({browser})=> 
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://webdriveruniversity.com/");
    await page.locator('#button-clicks').click();
    await page.locator('#button1').click();
});