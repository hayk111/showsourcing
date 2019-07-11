import { CreateProductPage } from '../create-product.po';
import { LoginPage } from '../../../auth/login/login.po';
import { ChangePasswordPage } from '../../../auth/change-password/change-password.po';
import { protractor, browser } from 'protractor';

describe('select 1 and create', async () => { // 'USD', 'cm', 'kg', 'inco term', 'harbour'
	let pageCreateProduct: CreateProductPage;
	let pageLogin: LoginPage;
	let pageChangePw: ChangePasswordPage;
	let numTabAvailable: any;
	let fieldFocusableIds: any = [];

	beforeEach(async () => {
		console.log('starting beforeEach....');
		pageCreateProduct = new CreateProductPage();
		pageLogin = new LoginPage();
		pageChangePw = new ChangePasswordPage();

		await pageCreateProduct.navigateTo();
		// await browser.waitForAngular();
		await pageLogin.login('sp@gmail.com', '12345', true);

		console.log('waiting pick-a-team...');
		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /pick-a-team/.test(url);
		}, 20000);

		browser.sleep(1000);
		console.log('waiting for teams...');

		await pageChangePw.firstDivOfUl.click();
		console.log('selected 1st team....');
		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /product/.test(url) && !/pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);

		const isOnBoardingDisplayed = await pageChangePw.onBoardingElem.isDisplayed();
		if (isOnBoardingDisplayed) {
			console.log('completing onboarding...');
			await pageChangePw.completeOnBoarding();
		}
		if (await pageCreateProduct.topPanelBtn.isDisplayed()) {
			await pageCreateProduct.topPanelBtn.click();

			if (!await pageCreateProduct.creationProductDlgApp.isDisplayed()) {
				fail('can not open "creation-product-dlg-app"');
			}

			fieldFocusableIds = await pageCreateProduct.countTabs();
			numTabAvailable = fieldFocusableIds.length;
		} else {
			fail('can not find button "Add product" with id "topPanelBtn"');
		}
		console.log('beforeEach is done');
	});

	afterEach(async () => {
		console.log('afterEach');
		await browser.restart();
	});

	// it('the field should be focused when the picker opens', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not be focused', array: [] }];
	// 	for (let i = 0; i < selectors.length; i++) {
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const curActiveElem = await browser.driver.switchTo().activeElement();
	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			if (await inp.getId() === await curActiveElem.getId()) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(await selectors[i].getAttribute('placeholder'));
	// 			}
	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(await selectors[i].getAttribute('placeholder'));
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`Failed: ${failures.map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('should display the selector items', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display selector items', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const defaultValue = await selectors[i].getText();
	// 			if ((await pageCreateProduct.getSelRowAppByName(defaultValue)).length) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(await selectors[i].getAttribute('placeholder'));
	// 		}
	// 	}
	// 	if (count !== selectors.length) {
	// 		fail(`Failed: ${failures.map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	it(`should display related xxx and "+create new xxx "yyy""grey btn in the picker
	after type in the field and xxx\'s name yyy does not exist`, async () => {
			const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
			let count = 0;
			const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display create btn', array: [] }];

			for (let i = 0; i < selectors.length; i++) {
				await selectors[i].click();
				browser.sleep(1000);
				if (await pageCreateProduct.isOpenedSelPickerApp()) {
					const defaultValue = await selectors[i].getText();
					const newItem = `${defaultValue}-${new Date().getTime()}`; // make sure new supplier or category does not exist

					const inp = await pageCreateProduct.getFieldNamePickerApp;
					await inp.clear();
					await inp.sendKeys(newItem);

					browser.sleep(1000);

					if (await pageCreateProduct.isHaveSelBtnRowApp()) {
						count++;
					} else {
						failures[1].array.push(defaultValue);
					}

					await pageCreateProduct.closeSelPickerApp();
				} else {
					failures[0].array.push(await selectors[i].getAttribute('placeholder'));
				}
			}

			if (count !== selectors.length) {
				fail(`Failed: ${failures.map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
			} else {
				return expect(count).toEqual(selectors.length);
			}

		});

});
