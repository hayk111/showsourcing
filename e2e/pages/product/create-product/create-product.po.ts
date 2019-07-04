import { browser, by, element, protractor } from 'protractor';

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

	async countTabs() {
		const array = [];
		let currentActiveElem = await browser.driver.switchTo().activeElement(), firstId;

		// when field "name" not be focused, we will trigger tab to focus field "name"
		if (!currentActiveElem || !await currentActiveElem.getId()) {
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
		}
		firstId = await currentActiveElem.getId();
		array.push(firstId); // add id of field "name" to array

		// trigger next focus
		await browser.actions().sendKeys(protractor.Key.TAB).perform();
		currentActiveElem = await browser.driver.switchTo().activeElement();

		while (firstId !== await currentActiveElem.getId()) {
			array.push(await currentActiveElem.getId());
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
		}
		return array.length || 0; // length will be 37 (except button "Save product")
	}

	async isOpenedSelPicker() {
		const app = await browser.driver.findElement(by.tagName('selector-picker-app'));
		return app && await app.isDisplayed();
	}

	get inputsOfDynamicformApp() {
		const dynamicformApp = browser.driver.findElement(by.tagName('dynamic-form-app'));
		return dynamicformApp.findElements(by.tagName('input'));
	}

	get inpRadiosOfDlgApp() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		return dlgApp.findElements(by.css('input[type="radio"]'));
	}

	async fieldsOfDlgApp() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		const textInps = await dlgApp.findElements(by.css('input[type="text"]'));
		const numInps = await dlgApp.findElements(by.css('input[type="number"]'));
		const radioInps = await dlgApp.findElements(by.css('input[type="radio"]'));
		const btns = await dlgApp.findElements(by.css('button.secondary'));
		console.log({
			textInps: textInps.length,
			numInps: numInps.length,
			radioInps: radioInps.length,
			btns: btns.length
		});
		return [...textInps, ...numInps, ...radioInps, ...btns];
	}

	async closeSelPickerApp() {
		const doneBtn = await this.selPickerApp.findElement(by.css('button.secondary'));
		await doneBtn.click();
	}

	get selectorPlaceHolderApp() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		return dlgApp.findElements(by.tagName('selector-placeholder-app'));
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

	get selPickerApp() {
		return browser.driver.findElement(by.tagName('selector-picker-app'));
	}
}
