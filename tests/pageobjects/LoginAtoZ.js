const { expect } = require('@playwright/test');


class loginPage {

    constructor(page) {
        this.page = page;
        this.validUsername =  page.locator('#user-name');
        this.validPassword = page.locator('#password');
        this.clickLogIn = page.locator('#login-button');   
        this.burgerButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');



    }

    async validLogIn(username, password) {

       await this.validUsername.fill(username);
       await this.validPassword.fill(password);
       await this.clickLogIn.click();

    }

    async clickBurgerButton() {

        await this.burgerButton.click();

    }

    async clickLogout() {

        await this.logoutButton.click();

    }




}

export default loginPage;