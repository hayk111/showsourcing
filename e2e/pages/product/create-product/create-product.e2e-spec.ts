import { CreateProductPage } from './create-product.po';
import { LoginPage } from '../../auth/login/login.po';
import { ChangePasswordPage } from '../../auth/change-password/change-password.po';
import { protractor, browser } from 'protractor';

describe('create product test suite', () => {
	let pageCreateProduct: CreateProductPage;
	let pageLogin: LoginPage;
	let pageChangePw: ChangePasswordPage;

	beforeAll(async () => {
		console.log('starting beforeAll....');
		await browser.restart();
		pageCreateProduct = new CreateProductPage();
		pageLogin = new LoginPage();
		pageChangePw = new ChangePasswordPage();

		await pageCreateProduct.navigateTo();
		browser.waitForAngular();
		await pageLogin.login('sp@gmail.com', '12345', true);

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			if (/pick-a-team/.test(url)) {

				console.log(url)
			}
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
		console.log('beforeAll is done');
	});

	beforeEach(async () => {
		console.log('starting beforeEach....');
		if (await pageCreateProduct.topPanelBtn.isDisplayed()) {
			await pageCreateProduct.topPanelBtn.click();

			if (!await pageCreateProduct.creationProductDlgApp.isDisplayed()) {
				fail('can not open "creation-product-dlg-app"');
			}
		} else {
			fail('can not find button "Add product" with id "topPanelBtn"');
		}
		console.log('beforeEach is done');
	});

	// it('first field should be focussed by default', async () => {
	// 	const inp = await pageCreateProduct.getInputByName('name');
	// 	if (await inp.isDisplayed()) {
	// 		if (await inp.getId() === await browser.driver.switchTo().activeElement().getId()) {
	// 			return expect(true).toBe(true);
	// 		} else {
	// 			fail('field "name" not focussed by default');
	// 		}
	// 	} else {
	// 		fail('can not get input with name "name"');
	// 	}
	// });

	it('all fields should be focusable', async () => {
		// expect(false).toBe(true, 'This is not something I\'ve expected');
		// expect(true).toBe(true)
		let expectInp = true, expectSelector = true, expectBoolean = true, expectButtons = true, expectCheckbox = true;

		// check input field focusable
		const inps = await pageCreateProduct.inputsOfDynamicformApp;
		for (let i = 0; i < inps.length; i++) {
			if (await inps[i].getAttribute('type') !== 'radio') {
				const placeholder = await inps[i].getAttribute('placeholder');
				const type = await inps[i].getAttribute('type');
				const isHidden = await inps[i].getAttribute('hidden');
				if (!await inps[i].getAttribute('hidden')) {
					await inps[i].sendKeys(1);
					browser.sleep(5000);
					if (!(await inps[i].getId() === await browser.driver.switchTo().activeElement().getId())) {
						expectInp = false;
					}
				}
			}
		}


		browser.sleep(200000);
		return expect(expectInp).toBe(true, 'input field focusable');
	});
});
