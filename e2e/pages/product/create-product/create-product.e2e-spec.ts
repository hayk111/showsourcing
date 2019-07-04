import { CreateProductPage } from './create-product.po';
import { LoginPage } from '../../auth/login/login.po';
import { ChangePasswordPage } from '../../auth/change-password/change-password.po';
import { protractor, browser, by, ExpectedConditions, WebDriver } from 'protractor';

describe('create product test suite', () => {
	let pageCreateProduct: CreateProductPage;
	let pageLogin: LoginPage;
	let pageChangePw: ChangePasswordPage;
	let numTabAvailable: any;

	beforeEach(async () => {
		console.log('starting beforeEach....');
		pageCreateProduct = new CreateProductPage();
		pageLogin = new LoginPage();
		pageChangePw = new ChangePasswordPage();

		await pageCreateProduct.navigateTo();
		browser.waitForAngular();
		await pageLogin.login('sp@gmail.com', '12345', true);

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);
		await pageChangePw.firstDivOfUl.click();
		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /product/.test(url) && !/pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);

		const isOnBoardingDisplayed = await pageChangePw.onBoardingElem.isDisplayed();
		if (isOnBoardingDisplayed) {
			await pageChangePw.completeOnBoarding();
		}
		if (await pageCreateProduct.topPanelBtn.isDisplayed()) {
			await pageCreateProduct.topPanelBtn.click();

			if (!await pageCreateProduct.creationProductDlgApp.isDisplayed()) {
				fail('can not open "creation-product-dlg-app"');
			}

			if (!numTabAvailable) {
				numTabAvailable = await pageCreateProduct.countTabs();
			}
		} else {
			fail('can not find button "Add product" with id "topPanelBtn"');
		}
		console.log('beforeEach is done');
	});

	afterEach(async () => {
		await browser.restart();
	});

	it('first field should be focused by default', async () => {
		const inp = await pageCreateProduct.getInputByName('name');
		if (await inp.isDisplayed()) {
			if (await inp.getId() === await browser.driver.switchTo().activeElement().getId()) {
				return expect(true).toBe(true);
			} else {
				fail('field "name" not focussed by default');
			}
		} else {
			fail('can not get input with name "name"');
		}
	});

	it('when selector field is focused it should be opened when typing', async () => {
		if (!numTabAvailable) {
			fail('can not count all fields focusable');
		}
		let currentActiveElem = await browser.driver.switchTo().activeElement();

		// when field "name" not be focused, we will trigger tab to focus any field
		if (!currentActiveElem || !await currentActiveElem.getId()) {
			await browser.actions().sendKeys(protractor.Key.TAB).perform();
			currentActiveElem = await browser.driver.switchTo().activeElement();
		}
		// find selector fields
		const selectors = await pageCreateProduct.selectorPlaceHolderApp;
		let count = 0;
		const failures = [];
		for (let i = 0; i < numTabAvailable; i++) {
			await browser.actions().sendKeys(protractor.Key.TAB).perform();

			const curActiveElem = await browser.driver.switchTo().activeElement();
			if (await curActiveElem.getTagName() === 'selector-placeholder-app') {
				await curActiveElem.sendKeys('abc');

				browser.sleep(1000);
				const isOpenedSelPickerApp = await pageCreateProduct.selPickerApp.isDisplayed();

				if (isOpenedSelPickerApp) { // opened "selector-picker-app"
					count++;
					await pageCreateProduct.closeSelPickerApp();
				} else {
					failures.push(await curActiveElem.getText());
				}
			}
		}
		return expect(count).toEqual(selectors.length, `Failed: ${failures.join(',')}`);
	});

	it('create product button should be disabled if the form has no name', async () => {
		const fieldName = await pageCreateProduct.getFieldName();
		if (!fieldName || !await fieldName.isDisplayed()) {
			fail('can not get input field "Name"');
		}
		if (await fieldName.getText() && (await fieldName.getText()).length) {
			await fieldName.clear();
		}
		const btn = await pageCreateProduct.createProdBtn;
		if (!await btn.isDisplayed()) {
			fail('can not get button "Save product" with id "createProduct"');
		}
		return expect(btn.isEnabled()).toBe(false);
	});

	it('dialog should be closed if "escape" key is pressed and selector field is closed', async () => {
		if (await pageCreateProduct.isOpenedSelPickerApp()) { // if select picker app opened, we will close it
			await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		}
		await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
		return expect(await pageCreateProduct.isOpenedCreProDlgApp()).toBeFalsy();
	});

	it('create product button should close dialog and redirect to product page, if checkbox "create another" is unmarked', async () => {
		const createAnoCheckbox = await pageCreateProduct.createAnotherBtn;
		if ((await createAnoCheckbox.getAttribute('value') === 'true')) { // if checkbox "create another" is marked, we will unmark
			await pageCreateProduct.clickAnotherCheckbox();
		}
		const fieldName = await pageCreateProduct.getFieldName();
		await fieldName.sendKeys('test');

		await pageCreateProduct.createProdBtn.click();
		browser.sleep(2000);
		// check product has been created with success
		const isSuccess = await pageCreateProduct.isNotiSuccess();
		expect(isSuccess).toBe(true, 'failed: product could not been created');

		const isUrlProductActivity = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /product\/.*?\/activity/g.test(url);
		}, 10000);

		expect(isUrlProductActivity).toBe(true, 'not redirect to product page');
		return expect(await pageCreateProduct.isOpenedCreProDlgApp()).toBeFalsy();
	});

	it('succes toast should appear if product was created with success', async () => {
		const fieldName = await pageCreateProduct.getFieldName();
		await fieldName.sendKeys('test');
		await pageCreateProduct.createProdBtn.click();
		browser.sleep(2000);
		// check product has been created with success
		const isSuccess = await pageCreateProduct.isNotiSuccess();
		return expect(isSuccess).toBe(true);
	});

	it('error toast should appear if product was not created', async () => {
		const fieldName = await pageCreateProduct.getFieldName();
		await fieldName.sendKeys('test');
		await pageCreateProduct.createProdBtn.click();
		browser.sleep(2000);
		// check product has been created with success
		const isSuccess = await pageCreateProduct.isNotiSuccess();
		return expect(isSuccess).toBe(false);
	});
});
