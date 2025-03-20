class iterateThroughProductsAndSelectItem {
    //Tests #11 and #12
    constructor(page) {

        this.page = page;
        this.itemNameLocator = page.locator('.inventory_item_name');
        this.cartButtonLocator = page.locator('.btn_primary');

    }

    async iterateAndSelect(itemNameToAdd) {//Tests #12

        for (let i = 0; i < await this.itemNameLocator.count(); i++) {

            const iterateProducts = this.itemNameLocator.nth(i);
            const printProducts = await iterateProducts.textContent();

            if (printProducts === itemNameToAdd) {

                await this.cartButtonLocator.nth(i).click(); //samo izvuci index
                console.log(`You have added ${itemNameToAdd} in the cart.`);
                break;

            }

        }
    }


}

export default iterateThroughProductsAndSelectItem;