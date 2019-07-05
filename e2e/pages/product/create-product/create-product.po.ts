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
		array.push(await currentActiveElem.getId()); // add id of field "name" to array
		await currentActiveElem.sendKeys('123');  // for check focusable of "save product" button
		// trigger next focus
		await browser.actions().sendKeys(protractor.Key.TAB).perform();
		currentActiveElem = await browser.driver.switchTo().activeElement();

		while (firstId !== await currentActiveElem.getId()) {
			array.push(await currentActiveElem.getId());
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
		}
		return array || [];
	}

	async isOpenedSelPicker() {
		const app = await browser.driver.findElement(by.tagName('selector-picker-app'));
		return app && await app.isDisplayed();
	}

	async getInpFieldIds() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		const formFieldApps = await dlgApp.findElements(by.tagName('form-field-app'));
		const inpFields = [];
		for (let i = 0; i < formFieldApps.length; i++) {
			if ((await formFieldApps[i].findElements(by.tagName('input'))).length) {
				const inp = formFieldApps[i].findElement(by.tagName('input'));
				if (await inp.isDisplayed() && await inp.getAttribute('type') !== 'radio' && await inp.getAttribute('type') !== 'file') {
					inpFields.push(await inp.getId());
				}
			}
		}
		return inpFields;
	}

	async getBooleanFieldIds() {
		const dlgApp = await browser.driver.findElement(by.tagName('dialog-app'));
		const radioApp = await dlgApp.findElement(by.tagName('radio-app'));
		const divFocusWrappers = await radioApp.findElements(by.css('div.focus-wrapper'));
		return Promise.all(divFocusWrappers.map(async e => (await e.getId())));
	}

	async getCheckboxIds() {
		const dlgApp = await browser.driver.findElement(by.tagName('dialog-app'));
		const checkboxApps = await dlgApp.findElements(by.tagName('checkbox-app'));
		// *[@id="createAnother"]/div/div/div
		return Promise.all(checkboxApps.map(async e => (await e.findElement(by.xpath('div/div')).getId())));
	}

	async getButtonIds() {
		const dlgApp = await browser.driver.findElement(by.tagName('dialog-app'));
		const btns = await dlgApp.findElements(by.tagName('button'));
		return Promise.all(btns.map(async e => (await e.getId())));
	}

	get inpRadiosOfDlgApp() {
		const dlgApp = browser.driver.findElement(by.tagName('dialog-app'));
		return dlgApp.findElements(by.css('input[type="radio"]'));
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

	async setAttachment(url: string) {
		const inpAttachment = await browser.driver.findElement(by.id('inpAttachment'));
		const script = `arguments[0].style.visibility = "visible"; arguments[0].style.height = "1px";
		arguments[0].style.width = "1px"; arguments[0].style.opacity = 1`;
		await browser.driver.executeScript(script, inpAttachment);
		browser.sleep(1000);
		await inpAttachment.sendKeys(url);
	}

	async isListAppExisted() {
		return (await browser.driver.findElements(by.tagName('list-app')) || []).length;
	}

	async isAttachmentUploaded() {
		const listItemApp = await browser.driver.findElements(by.tagName('list-item-app'));
		if (!listItemApp || !listItemApp.length) {
			fail('can not get "list-item-app"');
		} else {
			const newAttachment = listItemApp[listItemApp.length - 1]; // get the last one
			return (await newAttachment.findElements(by.tagName('spinner-app')) || []).length;
		}
	}

	get addFileBtn() {
		return browser.driver.findElement(by.id('addFile'));
	}
}
