import { browser, by, element } from 'protractor';

export class CreateProductPage {

	navigateTo() {
		return browser.get('/product');
	}

	// navigateToDashboard() {
	// 	return browser.get('/dashboard');
	// }

	async submit(email: string) {
		const emailInp = element(by.css('input[name="email"]'));
		await emailInp.sendKeys(email);

		const btn = element(by.css('input[type="submit"]'));

		await btn.click();
	}

	async getInputByName(name: string) {
		const dynamicInputApp = await this.dynamicInputAppByName(name);
		return await dynamicInputApp.findElement(by.tagName('input'));
	}

	async dynamicInputAppByName(name: string) {
		return await browser.driver.findElement(by.css(`[ng-reflect-name="${name}"]`));
	}

	get inputsOfDynamicformApp() {
		const dynamicformApp = browser.driver.findElement(by.tagName('dynamic-form-app'));
		return dynamicformApp.findElements(by.tagName('input'));
	}

	get dynamicformApp() {
		return browser.driver.findElement(by.tagName('dynamic-form-app'));
	}

	get topPanelBtn() {
		return browser.driver.findElement(by.id('topPanelBtn'));
	}

	get creationProductDlgApp() {
		return browser.driver.findElement(by.tagName('creation-product-dlg-app'));
	}

	get errorElem() {
		return element(by.tagName('error-app'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

}
// ] text [ 0 ] [ 'name' ]
// [1] text [ 1 ] [ '' ]
// [1] text [ 2 ] [ 'MOQ' ]
// [1] text [ 3 ] [ '' ]
// [1] text [ 4 ] [ '' ]
// [1] text [ 5 ] [ '' ]
// [1] text [ 6 ] [ 'Length' ]
// [1] text [ 7 ] [ 'Width' ]
// [1] text [ 8 ] [ 'Height' ]
// [1] text [ 9 ] [ '' ]
// [1] text [ 10 ] [ 'Quantity' ]
// [1] text [ 11 ] [ 'Weight' ]
// [1] text [ 12 ] [ '' ]
// [1] text [ 13 ] [ 'Length' ]
// [1] text [ 14 ] [ 'Width' ]
// [1] text [ 15 ] [ 'Height' ]
// [1] text [ 16 ] [ '' ]
// [1] text [ 17 ] [ 'Quantity' ]
// [1] text [ 18 ] [ 'Weight' ]
// [1] text [ 19 ] [ '' ]
// [1] text [ 20 ] [ 'Master Carton CBM' ]
// [1] text [ 21 ] [ 'Quantity per 20\'' ]
// [1] text [ 22 ] [ 'Quantity per 40\'' ]
// [1] text [ 23 ] [ 'Quantity per 40\' HC' ]