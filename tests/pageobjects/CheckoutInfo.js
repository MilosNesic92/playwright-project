class CheckoutInformation {

constructor(page) {

    this.page = page;
    this.firstName = page.locator('#first-name');
    this.secondName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');

}

async personalInfo(name, surname, zip) {

    await this.firstName.fill(name);
    await this.secondName.fill(surname);
    await this.postalCode.fill(zip);

}

async clickContinueBtn() {

    await this.continueBtn.click();

}

async clickFinishBtn() {

    await this.finishBtn.click()

}


}

export default CheckoutInformation;