const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test('First Playwright Test', async ({ browser }) => 
{
	const context = await browser.newContext();
	const page = await context.newPage();
	const userName = page.locator('#username');
	const signIn = page.locator("#signInBtn");
	const cardTitles = page.locator(".card-body a");
	await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
	console.log(await page.title());
	await userName.fill("rahulshetty");
	await page.locator("[type='password']").fill("learning");
	await signIn.click();
	console.log(await page.locator("[style*='block']").textContent());
	await page.locator('#signInBtn').click();
	await expect(page.locator("[style*='block']")).toContainText('Incorrect');
	await userName.fill("");
	await userName.fill("rahulshettyacademy");
	await signIn.click();
	await page.locator(".card-body a").first().waitFor();
	// console.log(await cardTitles.nth(0).textContent());

	const allTitles = await cardTitles.allTextContents();
	console.log(allTitles);

});

test('Valid log in', async ({page})=>{

   const userName = page.locator('#username');
   await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
   await userName.fill("rahulshettyacademy");
   await page.locator('#password').fill("learning");
   await page.locator('#signInBtn').click();

});

test('Page Playwright Test', async ({ page }) => {

	await page.goto("http://google.com");
	await page.title();
	await expect(page).toHaveTitle("Google");
});

test('UI Controls', async ({ page }) => {

	await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
	const userName = page.locator('#username');
	const signIn = page.locator('#signInBtn');
	const documentLink = page.locator("[href*='documents-request']");
	const dropdown = page.locator('select.form-control')
	await dropdown.selectOption('Consultant');
	await page.locator('.radiotextsty').nth(1).click();
	await page.locator('#okayBtn').click();
	await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
	await page.locator('#terms').click();
	await expect(page.locator('#terms')).toBeChecked();
	await page.locator('#terms').uncheck();
	await expect(page.locator(documentLink)).toHaveAttribute('class','blinkingText');
	await page.pause();
});


test('Child windows nahdling', async ({ browser }) => {

	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
	const documentLink = page.locator("[href*='documents-request']");

	const [newPage] = await Promise.all(
	[
	context.waitForEvent('page'), 	//listen for new page
	documentLink.click(),			//new page opens
	]) //Promise needs to fulfill all of the steps inside [] in order for promise to work
	
	const text1 = await newPage.locator('.red').textContent();
	const arrayText = text1.split("@");
	const domain = arrayText[1].split(" ") [0];
	console.log(domain);
	await page.locator("#username").fill(domain);
	await page.pause();
	console.log (await page.locator("#username").textContent());


});