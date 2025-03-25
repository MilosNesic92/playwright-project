const { expect } = require('@playwright/test');

class LogInPractice {

    constructor(page) {

        this.page = page;
        this.LogInUsername = page.locator('#user-name');
        this.LogInPassword = page.locator('#password');
        this.clickLogInBtn = page.locator('#login-button');
        this.clickBurgerBtn = page.locator('#react-burger-menu-btn');
        this.clickLogOutBtn = page.locator('#logout_sidebar_link');
        this.verifyProducts = page.locator('.title');
        this.cartCount = page.locator('.shopping_cart_link');
        this.errorMessage = page.locator('.error-message-container');

    }


    async LogInPage(username, password) {

        await this.LogInUsername.fill(username);
        await this.LogInPassword.fill(password);
        await this.clickLogInBtn.click();

    }

    async LogOut() {

        await this.clickBurgerBtn.click();
        await this.clickLogOutBtn.click();

    }

    async verifyProductTitle(title) {

        await expect.soft(this.verifyProducts).toHaveText(title);

    }

    async verifyCartCount(count) {

        await expect.soft(this.cartCount).toHaveCount(count);

    }

    async verifyErrorMessage(textError) {

        await expect.soft(this.errorMessage).toHaveText(textError);

    }



}

export default LogInPractice;