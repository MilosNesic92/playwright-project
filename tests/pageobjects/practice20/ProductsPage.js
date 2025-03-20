class ProductsPage {

constructor(page) {
    this.page = page;
    this.sortZtoA = page.locator('.product_sort_container');
    this.sortLowToHigh = page.locator('.product_sort_container');
    this.sortHighToLow = page.locator('.product_sort_container');
    this.clickAddToCartBtn = page.locator('.btn_primary');
    this.cartBtn = page.locator('#shopping_cart_container');

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

async clickCartBtn() {

    await this.cartBtn.click();

}
    

}

export default ProductsPage;