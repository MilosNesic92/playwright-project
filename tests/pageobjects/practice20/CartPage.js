class CartPage {

    constructor(page) {
        this.page = page;
        this.clickCheckout = page.locator('#checkout');
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');
        this.finishBtn = page.locator('#finish');

    }

    async clickCheckoutBtn() {

        await this.clickCheckout.click();

    }

    async checkoutPersonalInfo(name, surname, zip) {

        await this.firstName.fill(name);
        await this.lastName.fill(surname);
        await this.postalCode.fill(zip);

    }

    async clickContinueBtn() {

        await this.continueBtn.click();

    }

    async clickFinishBtn() {

        await this.finishBtn.click();

    }


}

export default CartPage;