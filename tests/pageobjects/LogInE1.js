class LogIn {

    constructor(page) {

        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.clickLogInBtn = page.locator('#login-button');

    }

    async valigLogIn(usename) {

        await this.username.fill(usename);
        

    }

    async valigLogInPass(password) {

        await this.password.fill(password);

    }


    async clickLogBtn() {

        await this.clickLogInBtn.click();

    }


}

export default LogIn;


        