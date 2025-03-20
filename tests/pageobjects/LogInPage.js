export class LogInPage {

    constructor(page) {

    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

    }

    async validLogIn(username, password) {

        await this.userName.fill(username);
        await this.password.fill(password);

    }

    async goTo() {

        await this.page("https://rahulshettyacademy.com/client");
        
    }

}