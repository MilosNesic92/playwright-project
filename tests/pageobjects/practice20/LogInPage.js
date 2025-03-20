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



}

export default LogInPractice;