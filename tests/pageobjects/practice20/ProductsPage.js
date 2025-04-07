const { expect } = require('@playwright/test');

class ProductsPage {

constructor(page) {
    this.page = page;
    this.sortZtoA = page.locator('.product_sort_container');
    this.sortLowToHigh = page.locator('.product_sort_container');
    this.sortHighToLow = page.locator('.product_sort_container');
    this.clickAddToCartBtn = page.locator('.btn_primary');
    this.cartBtn = page.locator('#shopping_cart_container');
    this.removeBtn = page.locator('.btn_secondary');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.titleSwagLabs = page.locator('.login_logo');
    this.dropdownAtoZ = page.locator('.active_option');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.completeHeader = page.locator('.complete-header');
    this.errorMsgContainer = page.locator('.error-message-container');
    this.itemName = page.locator('.inventory_item_name');

}

async sortingZtoA() {

    await this.sortZtoA.selectOption({ value: 'za' });

}

async sortingLowHigh() {

    await this.sortLowToHigh.selectOption({ value: 'hilo' });

}

async sortingHighLow() {

    await this.sortHighToLow.selectOption({ value: 'lohi' });

}





async addToCartBtn() {

    await this.clickAddToCartBtn.nth(0).click();
    await this.clickAddToCartBtn.nth(3).click();
    await this.clickAddToCartBtn.nth(2).click();

}

async iterateThroughProducts() {

    for (let i = 0; i < await this.itemName.count(); i++) {

        const iterateProducts = this.itemName.nth(i);
        const printProducts = await iterateProducts.textContent();
        console.log(printProducts);

    }


}



async verifyInvisibleCartBadge() {

    await expect.soft(this.cartBadge).not.toBeVisible();

}

async verifySwagLabsTitle(swagLabs) {

    await expect.soft(this.titleSwagLabs).toHaveText(swagLabs);

}

async verifyAtoZDropdown(atoz) {

    await expect.soft(this.dropdownAtoZ).toHaveText(atoz);

}

async verifyShoppingCartBadge(cartBadgeNumber) {

    await expect.soft(this.shoppingCartBadge).toHaveText(cartBadgeNumber);

}

async verifyCompleteHeader(thankYouText) {

    await expect.soft(this.completeHeader).toHaveText(thankYouText);

}

async verifyErrorMsgContainer(errorMsg) {

    await expect.soft(this.errorMsgContainer).toHaveText(errorMsg);

}


 

}

export default ProductsPage;