import { CreateProductPage } from '../create-product.po';
import { LoginPage } from '../../../auth/login/login.po';
import { ChangePasswordPage } from '../../../auth/change-password/change-password.po';
import { protractor, browser } from 'protractor';

describe('select 1 can not create', async () => { // 'USD', 'cm', 'kg', 'inco term', 'harbour'
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
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
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
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display selector items', array: [] }];
		const check = async (text, rowName) => {
			if ((await pageCreateProduct.getSelRowAppByName(rowName)).length) {
				count++;
			} else {
				failures[1].array.push(text);
			}
		};
		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if (defaultValue === 'USD') {
					await check(selectors[i], 'currency');
				} else { // case USD, cm, kg, inco term, harbour
					await check(selectors[i], 'name');
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
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not able to type', array: [] }];
		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const inp = await pageCreateProduct.getFieldNamePickerApp;
				const text = 'abc';
				await inp.clear();
				await inp.sendKeys(text);
				if (await inp.getAttribute('value') === text) {
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

	it('the first xxx should be focused when type the letter of existing xxx', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'the 1st xxx not be focused', array: [] }];

		const check = async (selector, inpElem, key, rowName) => {
			await inpElem.sendKeys(key);
			browser.sleep(1000); // wait until finish load options
			const rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				const textRowApp = await pageCreateProduct.getTextRowApp(rows[0]);
				if (textRowApp.includes(key) && await pageCreateProduct.isHaveActiveRow()) {
					count++;
				} else {
					failures[2].array.push(await selector.getText());
				}
			} else {
				failures[1].array.push(await selector.getText());
			}
			await pageCreateProduct.closeSelPickerApp();
		};

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				const inpElem = await pageCreateProduct.getFieldNamePickerApp;
				let key = '';
				await inpElem.clear(); // 1st time open selector, the field name get `undefined`, we will clear it!
				switch (defaultValue) {
					case 'USD':
						key = 'euro';
						await check(selectors[i], inpElem, key, 'currency');
						break;
					case 'cm':
						key = 'ft';
						await check(selectors[i], inpElem, key, 'name');
						break;
					case 'kg':
						key = 'lb';
						await check(selectors[i], inpElem, key, 'name');
						break;
					case 'inco term':
						key = 'fas';
						await check(selectors[i], inpElem, key, 'name');
						break;
					case 'harbour':
						key = 'barce';
						await check(selectors[i], inpElem, key, 'name');
						break;
					default:
						break;
				}
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

	it('should change xxx (when click xxx) if xxx is already selected by up and down keys', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'xxx not change when click', array: [] }];

		const check = async (selector, rowName, defaultValue) => {
			// select 1st option
			let rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				// select with key down
				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
				await browser.actions().sendKeys(protractor.Key.ENTER).perform();
			} else {
				failures[1].array.push(await selector.getText());
			}
			// get current value after press enter
			const oldValue = await selector.getText();

			// re-open
			await selector.click();
			browser.sleep(1000);

			rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				if (rows.length > 2) {
					await rows[2].click(); // select second option
					const newValue = await selector.getText();
					if (oldValue !== newValue) {
						count++;
					}
				} else {
					await rows[0].click();
				}
			} else {
				failures[1].array.push(await selector.getText());
			}
		};

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if (defaultValue === 'USD') {
					await check(selectors[i], 'currency', defaultValue);
				} else { // case USD, cm, kg, inco term, harbour
					await check(selectors[i], 'name', defaultValue);
				}
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

	it('should change xxx when press enter key if xxx is already selected by up and down keys', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'xxx not change when click', array: [] }];

		const check = async (selector, rowName, defaultValue) => {
			// select 1st option
			let rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				// select with key down
				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
				await browser.actions().sendKeys(protractor.Key.ENTER).perform();
			} else {
				failures[1].array.push(await selector.getText());
			}
			// get current value after press enter
			const oldValue = await selector.getText();

			// re-open
			await selector.click();
			browser.sleep(1000);

			rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				if (rows.length > 2) {
					const newValue = await pageCreateProduct.getCurrency(rows[1]);
					// select second option by press enter
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					await browser.actions().sendKeys(protractor.Key.ENTER).perform();
					if (oldValue !== newValue) {
						count++;
					}
				} else {
					await rows[0].click();
				}
			} else {
				failures[1].array.push(await selector.getText());
			}
		};

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if (defaultValue === 'USD') {
					await check(selectors[i], 'currency', defaultValue);
				} else { // case USD, cm, kg, inco term, harbour
					await check(selectors[i], 'name', defaultValue);
				}
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

	it('should be able to jump to "done" from the field when press tab key', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'xxx not able to jump by tab key', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				await browser.actions().sendKeys(protractor.Key.TAB).perform();
				const currentActiveElem = await browser.driver.switchTo().activeElement();
				if (currentActiveElem && (await currentActiveElem.getText() === 'Done')) {
					count++;
				} else {
					failures[1].array.push(await selectors[i].getText());
				}
			} else {
				failures[0].array.push(await selectors[i].getAttribute('placeholder'));
			}

			await pageCreateProduct.closeSelPickerApp();
		}

		if (count !== selectors.length) {
			fail(`Failed: ${failures.map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	it('the selector should be closed and xxx should be updated when press key enter', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector does not have options', array: [] },
		{ text: 'selector not close', array: [] }, { text: 'xxx not update', array: [] }];

		const check = async (selector, rowName, defaultValue) => {
			const rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				// select with key down
				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
				await browser.actions().sendKeys(protractor.Key.ENTER).perform();
				if (!await pageCreateProduct.isOpenedSelPickerApp()) {
					if ((await selector.getText()) !== defaultValue) {
						count++;
					} else {
						failures[3].array.push(await selector.getText());
					}
				} else {
					failures[2].array.push(await selector.getText());
				}
			} else {
				failures[1].array.push(await selector.getText());
			}
		};

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if (defaultValue === 'USD') {
					await check(selectors[i], 'currency', defaultValue);
				} else { // case USD, cm, kg, inco term, harbour
					await check(selectors[i], 'name', defaultValue);
				}
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

	it('the selector should be closed and xxx should be updated when select an option', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector does not have options', array: [] },
		{ text: 'selector not close', array: [] }, { text: 'xxx not update', array: [] }];

		const check = async (selector, rowName, defaultValue) => {
			const rows = await pageCreateProduct.getSelRowAppByName(rowName);
			if (rows.length) {
				// select with key down
				if (defaultValue === 'cm') {
					await rows[1].click();
				} else {
					await rows[0].click();
				}
				if (!await pageCreateProduct.isOpenedSelPickerApp()) {
					if ((await selector.getText()) !== defaultValue) {
						count++;
					} else {
						failures[3].array.push(await selector.getText());
					}
				} else {
					failures[2].array.push(await selector.getText());
				}
			} else {
				failures[1].array.push(await selector.getText());
			}
		};

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				const defaultValue = await selectors[i].getText();
				if (defaultValue === 'USD') {
					await check(selectors[i], 'currency', defaultValue);
				} else { // case USD, cm, kg, inco term, harbour
					await check(selectors[i], 'name', defaultValue);
				}
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

	it('should close only the slector picker when press escape key', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector not close when press escape', array: [] },
		{ text: 'selector not close when press "done" button', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();

				if (await pageCreateProduct.isOpenedSelPickerApp()) {
					failures[1].array.push(await selectors[i].getText());
					await pageCreateProduct.closeSelPickerApp();
				} else {
					count++;
				}
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

	it('should close only the slector picker when press "done" button', async () => {
		const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector not close when press "done" button', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				await pageCreateProduct.pressDoneBtn();

				if (await pageCreateProduct.isOpenedSelPickerApp()) {
					failures[1].array.push(await selectors[i].getText());
					await pageCreateProduct.closeSelPickerApp();
				} else {
					count++;
				}
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
