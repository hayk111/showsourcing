import { CreateProductPage } from '../create-product.po';
import { LoginPage } from '../../../auth/login/login.po';
import { ChangePasswordPage } from '../../../auth/change-password/change-password.po';
import { protractor, browser } from 'protractor';

describe('select multiple & create', async () => { // 'USD', 'cm', 'kg', 'inco term', 'harbour'
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
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not be focused', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const curActiveElem = await browser.driver.switchTo().activeElement();
	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			if (await inp.getId() === await curActiveElem.getId()) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('should display the selector items', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display selector items', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			if ((await pageCreateProduct.getSelRowAppByName(defaultValue)).length) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('should be able to type in the field', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'the field not be focused', array: [] }];
	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {

	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			await inp.clear();

	// 			const newItem = `${defaultValue}-${new Date().getTime()}`;
	// 			const oldValue = await inp.getAttribute('value');

	// 			await inp.sendKeys(newItem);
	// 			if (await inp.getAttribute('value') !== oldValue) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}

	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// tslint:disable-next-line: max-line-length
	// it(`should display related xxx and "+create new xxx "yyy""grey btn in the picker after type in the field and xxx\'s name yyy does not exist`, async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display create btn', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const newItem = `${defaultValue}-${new Date().getTime()}`; // make sure new supplier or category does not exist

	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			await inp.clear();
	// 			await inp.sendKeys(newItem);

	// 			browser.sleep(1000);

	// 			if (await pageCreateProduct.isHaveSelBtnRowApp()) {
	// 				count++;
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}

	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// tslint:disable-next-line: max-line-length
	// it('should create new xxx with name "yyy" when grey "+create new xxx "yyy"" button is displayed and (pressing key enter or clicking the button)', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'not display create btn', array: [] },
	// 	{ text: 'not create new xxx', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const newItem = `${defaultValue}-${new Date().getTime()}`; // make sure new supplier or category does not exist

	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			await inp.clear();
	// 			await inp.sendKeys(newItem);

	// 			browser.sleep(1000);
	// 			if (await pageCreateProduct.isHaveSelBtnRowApp()) {
	// 				await pageCreateProduct.creatBtn.click();
	// 				if (await selectors[i].getText() === newItem) {
	// 					count++;
	// 				} else {
	// 					failures[2].array.push(defaultValue);
	// 				}
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}

	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('the first xxx should be focused when type the letter of existing xxx in the selector field', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] },
	// 	{ text: 'selector does not have options', array: [] }, { text: 'the first xxx not be focused', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText(); // will be supplier or category
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 			await inp.clear();
	// 			await inp.sendKeys(defaultValue);

	// 			browser.sleep(5000);
	// 			const rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
	// 			if (rows.length) {
	// 				const textRowApp = await pageCreateProduct.getTextRowApp(rows[0]);
	// 				if (textRowApp.includes(defaultValue) &&
	// 					await pageCreateProduct[defaultValue === 'tag' ? 'isHaveTagActiveRow' : 'isHaveProjectActiveRow']()) {
	// 					count++;
	// 				} else {
	// 					failures[2].array.push(defaultValue);
	// 				}
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}

	// 			await pageCreateProduct.closeSelPickerApp();
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${(failures.filter(o => o.array.length)).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('the picker should not disappear and input should reseted and badge should be added under input after choose one xxx', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector does not have options', array: [] },
	// 	{ text: 'xxx disappeared', array: [] }, { text: 'input not be reseted', array: [] }, { text: 'badge not be added', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText(); // will be supplier or category
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
	// 			if (rows.length) {
	// 				let isNotDisappear, isReseted, isBadgeAdded;

	// 				await rows[0].click();

	// 				if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 					isNotDisappear = true;
	// 				} else {
	// 					failures[2].array.push(defaultValue);
	// 				}

	// 				const inp = await pageCreateProduct.getFieldNamePickerApp;
	// 				if (!(await inp.getAttribute('value')).length) {
	// 					isReseted = true;
	// 				} else {
	// 					failures[3].array.push(defaultValue);
	// 				}

	// 				if (await pageCreateProduct.isHaveInfoBadgeApp()) {
	// 					isBadgeAdded = true;
	// 				} else {
	// 					failures[4].array.push(defaultValue);
	// 				}

	// 				if (isNotDisappear && isReseted && isBadgeAdded) {
	// 					count++;
	// 				}

	// 				await pageCreateProduct.closeSelPickerApp();
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('should be able to select xxx using up and down keys', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] },
	// 	{ text: 'selector does not have options', array: [] }, { text: 'not be able to select', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText(); // will be supplier or category
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			const rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
	// 			if (rows.length) {
	// 				let up, down;
	// 				// 2nd row will be activated
	// 				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
	// 				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
	// 				if (await pageCreateProduct[defaultValue === 'tag' ? 'isHaveTagActiveRow' : 'isHaveProjectActiveRow']()) {
	// 					down = true;
	// 				} else {
	// 					failures[2].array.push(`${defaultValue} (key down failed)`);
	// 				}

	// 				// 1st row will be activated
	// 				await browser.actions().sendKeys(protractor.Key.UP).perform();
	// 				if (await pageCreateProduct[defaultValue === 'tag' ? 'isHaveTagActiveRow' : 'isHaveProjectActiveRow']()) {
	// 					up = true;
	// 				} else {
	// 					failures[2].array.push(`${defaultValue} (key up failed)`);
	// 				}

	// 				if (down && up) {
	// 					count++;
	// 				}
	// 				await pageCreateProduct.closeSelPickerApp();
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	// it('should change xxx when click xxx if xxx is already selected by up and down keys', async () => {
	// 	const selectors = await pageCreateProduct.selectors(['tag', 'project']);
	// 	let count = 0;
	// 	const failures = [{ text: 'can not open picker', array: [] },
	// 	{ text: 'selector does not have options', array: [] }, { text: 'xxx not change when click', array: [] }];

	// 	for (let i = 0; i < selectors.length; i++) {
	// 		const defaultValue = await selectors[i].getText();
	// 		await selectors[i].click();
	// 		browser.sleep(1000);

	// 		if (await pageCreateProduct.isOpenedSelPickerApp()) {
	// 			// select 1st option
	// 			let rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
	// 			if (rows.length) {
	// 				// select with key down
	// 				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
	// 				await browser.actions().sendKeys(protractor.Key.DOWN).perform();
	// 				// click active row
	// 				await pageCreateProduct[defaultValue === 'tag' ? 'tagActiveRow' : 'projectActiveRow'].click();
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 			// close selector-picker-app
	// 			await pageCreateProduct.closeSelPickerApp();
	// 			// get current value after press enter
	// 			const oldValue = await selectors[i].getText();
	// 			// re-open
	// 			await selectors[i].click();
	// 			browser.sleep(3000);

	// 			rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
	// 			if (rows.length) {
	// 				await rows[0].click();
	// 				const newValue = await selectors[i].getText();
	// 				if (oldValue !== newValue) {
	// 					count++;
	// 				}
	// 				await pageCreateProduct.closeSelPickerApp();
	// 			} else {
	// 				failures[1].array.push(defaultValue);
	// 			}
	// 		} else {
	// 			failures[0].array.push(defaultValue);
	// 		}
	// 	}

	// 	if (count !== selectors.length) {
	// 		fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
	// 	} else {
	// 		return expect(count).toEqual(selectors.length);
	// 	}
	// });

	it('should change xxx when press enter key if xxx is already selected by up and down keys', async () => {
		const selectors = await pageCreateProduct.selectors(['tag', 'project']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] },
		{ text: 'selector does not have options', array: [] }, { text: 'xxx not change when press enter', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			const defaultValue = await selectors[i].getText();
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				// select 1st option
				let rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
				if (rows.length) {
					// select with key down
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					await browser.actions().sendKeys(protractor.Key.DOWN).perform();
					await browser.actions().sendKeys(protractor.Key.ENTER).perform();
				} else {
					failures[1].array.push(defaultValue);
				}
				// close selector-picker-app
				await pageCreateProduct.closeSelPickerApp();
				// get current value after press enter
				const oldValue = await selectors[i].getText();

				// re-open
				await selectors[i].click();
				browser.sleep(3000);

				rows = await pageCreateProduct.getSelRowAppByName(defaultValue);
				if (rows.length) {
					await rows[0].click();
					const newValue = await selectors[i].getText();
					if (oldValue !== newValue) {
						count++;
					}
					// close selector-picker-app
					await pageCreateProduct.closeSelPickerApp();
				} else {
					failures[1].array.push(defaultValue);
				}
			} else {
				failures[0].array.push(defaultValue);
			}
		}

		if (count !== selectors.length) {
			fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	it('should be able to jump to "done" from the field when press tab key', async () => {
		const selectors = await pageCreateProduct.selectors(['tag', 'project']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'xxx not able to jump by tab key', array: [] }];
		for (let i = 0; i < selectors.length; i++) {
			const defaultValue = await selectors[i].getText();
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				await browser.actions().sendKeys(protractor.Key.TAB).perform();

				const currentActiveElem = await browser.driver.switchTo().activeElement();
				if (currentActiveElem && (await currentActiveElem.getText() === 'Done')) {
					count++;
				} else {
					failures[1].array.push(defaultValue);
				}
				await pageCreateProduct.closeSelPickerApp();
			} else {
				failures[0].array.push(defaultValue);
			}
		}

		if (count !== selectors.length) {
			fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	it('should close only the slector picker when press escape key', async () => {
		const selectors = await pageCreateProduct.selectors(['tag', 'project']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector not close when press escape', array: [] },
		{ text: 'selector not be closed when press "done" button', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			const defaultValue = await selectors[i].getText();
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
				failures[0].array.push(defaultValue);
			}
		}

		if (count !== selectors.length) {
			fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});

	it('should close only the slector picker when press "done" button', async () => {
		const selectors = await pageCreateProduct.selectors(['tag', 'project']);
		let count = 0;
		const failures = [{ text: 'can not open picker', array: [] }, { text: 'selector not be closed when press "done" button', array: [] }];

		for (let i = 0; i < selectors.length; i++) {
			const defaultValue = await selectors[i].getText();
			await selectors[i].click();
			browser.sleep(1000);

			if (await pageCreateProduct.isOpenedSelPickerApp()) {
				await pageCreateProduct.pressDoneBtn();

				if (await pageCreateProduct.isOpenedSelPickerApp()) {
					failures[1].array.push(await selectors[i].getText());
				} else {
					count++;
				}
			} else {
				failures[0].array.push(defaultValue);
			}
		}

		if (count !== selectors.length) {
			fail(`${failures.filter(o => o.array.length).map(e => (e.array.length ? `${e.text}: ${e.array.join(', ')}\n` : ''))}`);
		} else {
			return expect(count).toEqual(selectors.length);
		}
	});
});
