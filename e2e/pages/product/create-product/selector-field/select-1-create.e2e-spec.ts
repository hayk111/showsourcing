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

	it('the field should be focused when the picker opens', async () => {
		const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not be focused', array: [] }];
		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const curActiveElem = await browser.driver.switchTo().activeElement();
				const inp = await pageCreateProduct.getFieldNamePickerApp;
				if (await inp.getId() === await curActiveElem.getId()) {
					count++;
				} else {
					failures[1].array.push(await selectors[i].getAttribute('placeholder'));
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

	it('should display the selector items', async () => {
		const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display selector items', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if ((await pageCreateProduct.getSelRowAppByName(defaultValue)).length) {
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

	it('should be able to type in the field', async () => {
		const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not be focused', array: [] }];
		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();

				const inp = await pageCreateProduct.getFieldNamePickerApp;
				await inp.clear();

				const newItem = `${defaultValue}-${new Date().getTime()}`;
				const oldValue = await inp.getAttribute('value');

				await inp.sendKeys(newItem);
				if (await inp.getAttribute('value') !== oldValue) {
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

	// tslint:disable-next-line: max-line-length
	it(`should display related xxx and "+create new xxx "yyy""grey btn in the picker after type in the field and xxx\'s name yyy does not exist`, async () => {
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

	it('the first xxx should be focused when type the letter of existing xxx in the selector field', async () => {
		const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'the first xxx not be focused', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);
			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText(); // will be supplier or category

				const inp = await pageCreateProduct.getFieldNamePickerApp;
				await inp.clear();
				await inp.sendKeys(defaultValue);

				browser.sleep(5000);
				const rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
				if (rows.length) {
					const textRowApp = await pageCreateProduct[defaultValue === 'supplier' ? 'getTextSupplierApp' : 'getTextCategoryApp'](rows[0]);
					if (textRowApp.includes(defaultValue) &&
						await pageCreateProduct[defaultValue === 'supplier' ? 'isHaveSupplierActiveRow' : 'isHaveCategoryActiveRow']()) {
						count++;
					} else {
						failures[2].array.push(defaultValue);
					}
				} else {
					failures[1].array.push(defaultValue);
				}

				await pageCreateProduct.closeSelPickerApp();
			} else {
				failures[0].array.push(await selectors[i].getAttribute('placeholder'));
			}
		}

		if (count !== selectors.length) {
			fail(`Failed: ${(failures.filter(o => o.array.length)).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	it('should be able to select xxx using up and down keys', async () => {
		const selectors = await pageCreateProduct.selectors(['supplier', 'category']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'not be able to select', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);
			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText(); // will be supplier or category

				browser.sleep(5000);
				const rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
				if (rows.length) {
					let up, down;
					// 2nd row will be activated
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					if (await pageCreateProduct[defaultValue === 'supplier' ? 'isHaveSupplierActiveRow' : 'isHaveCategoryActiveRow']()) {
						down = true;
					} else {
						failures[2].array.push(`${defaultValue} (key down failed)`);
					}

					// 1st row will be activated
					await browser.actions().sendKeys(protractor.Key.UP).perform();
					if (await pageCreateProduct[defaultValue === 'supplier' ? 'isHaveSupplierActiveRow' : 'isHaveCategoryActiveRow']()) {
						up = true;
					} else {
						failures[2].array.push(`${defaultValue} (key down failed)`);
					}

					if (down && up) {
						count++;
					}
					await pageCreateProduct.closeSelPickerApp();
				} else {
					failures[1].array.push(defaultValue);
				}


			} else {
				failures[0].array.push(await selectors[i].getAttribute('placeholder'));
			}
		}

		if (count !== selectors.length) {
			fail(`Failed: ${(failures.filter(o => o.array.length)).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	// it('should change xxx when click xxx or when press enter key if xxx is alredy selected by up and down keys', async () => {
	// 	return expect(true).toBe(true);
	// });

	// it('xxx should always appear the first option when press enter key directly after type in the field', async () => {
	// 	return expect(true).toBe(true);
	// });

	// it('should be able to jump to "done" from the field when press tab key', async () => {
	// 	return expect(true).toBe(true);
	// });

	// it('should close only the slector picker when press escape key or press "done" button', async () => {
	// 	return expect(true).toBe(true);
	// });
});
