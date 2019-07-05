import { browser, by, element, protractor, ExpectedConditions, FileDetector } from 'protractor';

export class CreateProductPage {

	navigateTo() {
		return browser.get('/product');
	}

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

		// when field "name" not be focused, we will trigger tab to focus any field
		if (!currentActiveElem || !await currentActiveElem.getId()) {
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
		}
		firstId = await currentActiveElem.getId();
		array.push(firstId, await currentActiveElem.getId()); // add id of field "name" to array

		// trigger next focus
		await browser.actions().sendKeys(protractor.Key.TAB).perform();
		currentActiveElem = await browser.driver.switchTo().activeElement();
		console.log(await currentActiveElem.getTagName());

		while (firstId !== await currentActiveElem.getId()) {
			array.push(await currentActiveElem.getId());
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
			console.log(await currentActiveElem.getTagName(), await currentActiveElem.getId());
		}
		await this.fieldsOfDlgApp();
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
		// const aaa = await textInps[0].
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

	async getFieldName() {
		const dynamicInpApp = await this.dynamicformApp.findElements(by.tagName('dynamic-input-app'));
		return dynamicInpApp[0].findElement(by.tagName('input'));
	}

	async isOpenedSelPickerApp() {
		return (await browser.driver.findElements(by.tagName('selector-picker-app')) || []).length;
	}

	async isOpenedCreProDlgApp() {
		return (await browser.driver.findElements(by.tagName('creation-product-dlg-app')) || []).length;
	}

	async clickAnotherCheckbox() {
		const checkboxApp = await browser.driver.findElement(by.css('checkbox-app[id="createAnother"]'));
		// const label = checkboxApp.findElement(by.tagName('label'));
		await checkboxApp.findElement(by.tagName('label')).click();
	}

	async isNotiSuccess() {
		const notificationApp = await browser.driver.wait(async _ => {
			return browser.driver.findElement(by.tagName('notification-app'));
		}, 10000);

		if (await notificationApp.isDisplayed()) {
			return await notificationApp.findElement(by.css('div.success')).isDisplayed();
		} else {
			console.log('can not get notification-app');
			return false;
		}
	}

	async isOpenedSpinnerApp() {
		return (await browser.driver.findElements(by.tagName('spinner-app')) || []).length;
	}

	get selectorPlaceHolderApp() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		return dlgApp.findElements(by.tagName('selector-placeholder-app'));
	}

	get dynamicformApp() {
		return browser.driver.findElement(by.tagName('dynamic-form-app'));
	}

	get createProdBtn() {
		return browser.driver.findElement(by.id('createProduct'));
	}

	get topPanelBtn() {
		return browser.driver.findElement(by.id('topPanelBtn'));
	}

	get createAnotherBtn() {
		return browser.driver.findElement(by.css('input[id="createAnother"]'));
	}

	get creationProductDlgApp() {
		return browser.driver.findElement(by.tagName('creation-product-dlg-app'));
	}

	get selPickerApp() {
		return browser.driver.findElement(by.tagName('selector-picker-app'));
	}

	// for describe 'add image button should upload image'
	async isImgAppExisted() {
		return (await browser.driver.findElements(by.tagName('img-app')) || []).length;
	}

	async setImg(url: string) {
		const inpImg = await browser.driver.findElement(by.id('inpImg'));
		const script = `arguments[0].style.visibility = "visible"; arguments[0].style.height = "1px";
		arguments[0].style.width = "1px"; arguments[0].style.opacity = 1`;
		await browser.driver.executeScript(script, inpImg);
		browser.sleep(1000);
		await inpImg.sendKeys(url);
	}

	async isImgUploaded() {
		const imgApp = await browser.driver.findElement(by.tagName('img-app')); // get 1st img-app, it means "img-app" (the biggest one)
		const img = await imgApp.findElement(by.tagName('img'));
		return await browser.driver.wait(async _ => {
			const src = await img.getAttribute('src');
			return /files\.showsourcing\.com/.test(src);
		}, 15000);
	}

	async hoverImgAppCarousel() {
		const imgApp = await browser.driver.findElement(by.tagName('img-app')); // get 1st img-app, it means "img-app" (the biggest one)
		await browser.driver.actions().mouseMove(imgApp).perform();
	}

	async isDisplayAddBtn() {
		if ((await browser.driver.findElements(by.id('divAdd')) || []).length) {
			return await browser.driver.findElement(by.id('divAdd')).isDisplayed();
		} else {
			fail('can not get button "Add" of "carousel-app"');
		}
	}

	get addPictureBtn() {
		return browser.driver.findElement(by.id('addPicture'));
	}

	// for describe 'add attachment button should upload attachment'

	get addFileBtn() {
		return browser.driver.findElement(by.id('addFile'));
	}
}
