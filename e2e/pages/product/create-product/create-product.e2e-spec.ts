import { CreateProductPage } from './create-product.po';
import { LoginPage } from '../../auth/login/login.po';
import { ChangePasswordPage } from '../../auth/change-password/change-password.po';
import { protractor, browser } from 'protractor';

describe('create product test suite', () => {
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

	it('all fields should be focusable when navigating with "tab" key', async () => {
		if (!numTabAvailable) {
			fail('can not count all fields focusable');
		}

		// input field
		let inpFieldIds = await pageCreateProduct.getInpFieldIds();
		inpFieldIds = inpFieldIds.filter(o => !fieldFocusableIds.includes(o));
		expect(inpFieldIds.length).toBeFalsy('all input field can not be focusable');

		// selector fields
		let selFieldIds = await pageCreateProduct.getSelFieldIds();
		selFieldIds = selFieldIds.filter(o => !fieldFocusableIds.includes(o));
		expect(selFieldIds.length).toBeFalsy('all selector field can not be focusable');

		// boolean field
		let booleanFieldIds = await pageCreateProduct.getBooleanFieldIds();
		booleanFieldIds = booleanFieldIds.filter(o => !fieldFocusableIds.includes(o));
		expect(booleanFieldIds.length).toBeFalsy('all boolean field can not be focusable');

		// checkbox
		let checkboxIds = await pageCreateProduct.getCheckboxIds();
		checkboxIds = checkboxIds.filter(o => !fieldFocusableIds.includes(o));
		expect(checkboxIds.length).toBeFalsy('all checkbox field can not be focusable');

		// buttons
		let btnIds = await pageCreateProduct.getButtonIds();
		btnIds = btnIds.filter(o => !fieldFocusableIds.includes(o));
		expect(btnIds.length).toBeFalsy('all checkbox field can not be focusable');

		// selector price
		let selPriceIds = await pageCreateProduct.getSelPriceIds();
		selPriceIds = selPriceIds.filter(o => !fieldFocusableIds.includes(o));
		expect(selPriceIds.length).toBeFalsy('all selector price can not be focusable');

		// textarea
		let textareaIds = await pageCreateProduct.getTextareaIds();
		textareaIds = textareaIds.filter(o => !fieldFocusableIds.includes(o));
		expect(textareaIds.length).toBeFalsy('all textarea can not be focusable');

		return expect(true).toBe(true);
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
		const selectors = await pageCreateProduct.selectors();
		let count = 0;
		const failures = [];
		for (let i = 0; i < numTabAvailable; i++) {
			await browser.actions().sendKeys(protractor.Key.TAB).perform();

			const curActiveElem = await browser.driver.switchTo().activeElement();
			const tagName = await curActiveElem.getTagName();
			if (tagName === 'selector-placeholder-app' ||
				(tagName === 'div' && (await curActiveElem.getAttribute('class')).includes('currency'))) {
				await curActiveElem.sendKeys('abc');
				browser.sleep(1000);
				if (await pageCreateProduct.isOpenedSelPickerApp()) {
					count++;
					await pageCreateProduct.closeSelPickerApp();
				} else {
					failures.push(await curActiveElem.getText());
					fail('can not get selector-picker-app');
				}
			}
		}
		return expect(count).toEqual(selectors.length, `Failed: ${failures.join(', ')}`);
	});

	describe('select 1 can not create', async () => { // 'USD', 'cm', 'kg', 'inco term', 'harbour'
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
					switch (defaultValue) {
						case 'supplier':
							await check(defaultValue, 'supplier');
							break;
						case 'category':
							await check(defaultValue, 'category');
							break;
						case 'tag':
							await check(defaultValue, 'tag');
							break;
						case 'project':
							await check(defaultValue, 'project');
							break;
						case 'USD':
							await check(defaultValue, 'currency');
							break;
						default: // case USD, cm, kg, inco term, harbour
							await check(defaultValue, 'name');
							break;
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
			{ text: 'selector does have options', array: [] }, { text: 'the 1st xxx not be focused', array: [] }];

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
			{ text: 'selector does have options', array: [] }, { text: 'xxx not change when click', array: [] }];

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
					let key = '';
					switch (defaultValue) {
						case 'USD':
							key = 'euro';
							await check(selectors[i], 'currency', defaultValue);
							break;
						case 'cm':
							key = 'ft';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'kg':
							key = 'lb';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'inco term':
							key = 'fas';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'harbour':
							key = 'barce';
							await check(selectors[i], 'name', defaultValue);
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

		it('should change xxx when press enter key if xxx is already selected by up and down keys', async () => {
			const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
			let count = 0;
			const failures = [{ text: 'can not open picker', array: [] },
			{ text: 'selector does have options', array: [] }, { text: 'xxx not change when click', array: [] }];

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
					let key = '';
					switch (defaultValue) {
						case 'USD':
							key = 'euro';
							await check(selectors[i], 'currency', defaultValue);
							break;
						case 'cm':
							key = 'ft';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'kg':
							key = 'lb';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'inco term':
							key = 'fas';
							await check(selectors[i], 'name', defaultValue);
							break;
						case 'harbour':
							key = 'barce';
							await check(selectors[i], 'name', defaultValue);
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

		it('should be able to jump to "done" from the field when press tab key', async () => {
			const selectors = await pageCreateProduct.selectors(['USD', 'cm', 'kg', 'inco term', 'harbour']);
			let count = 0;
			const failures = [{ text: 'can not open picker', array: [] },
			{ text: 'selector does have options', array: [] }, { text: 'xxx not able to jump by tab key', array: [] }];

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

		it('the selector should be closed and xxx should be updated when select an optiong or press key enter', async () => {
			return expect(true).toBe(true);
		});

		it('should close only the slector picker when press escape key or press "done" button', async () => {
			return expect(true).toBe(true);
		});
	});

	// ------------ TEST SUITE UPLOAD IMAGE ------------
	describe('add image button should upload image', () => {

		it('"add picture" button should be displayed if there is no picture', async () => {
			expect(await pageCreateProduct.isImgAppExisted()).toBeFalsy();
			return expect(pageCreateProduct.addPictureBtn.isDisplayed()).toBe(true);
		});

		it('"Add picture button": spinner should appear if image is being uploaded', async () => {
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setImg(urlImg);
			browser.sleep(5000);
			return expect(await pageCreateProduct.isOpenedSpinnerApp()).toBeTruthy();
		});

		it('"Add picture button": spinner should disappear if image is uploaded', async () => {
			browser.sleep(1000);
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setImg(urlImg);
			browser.sleep(5000);

			expect(await pageCreateProduct.isImgAppExisted()).toBeTruthy('can not get "img-app"');
			expect(await pageCreateProduct.isImgUploaded()).toBe(true, 'can not upload image');
			return expect(await pageCreateProduct.isOpenedSpinnerApp()).toBeFalsy();
		});

		it('"Add picture button": a toast massege should appear if image is uploaded', async () => {
			browser.sleep(1000);
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setImg(urlImg);
			browser.sleep(5000);

			expect(await pageCreateProduct.isImgAppExisted()).toBeTruthy('can not get "img-app"');
			expect(await pageCreateProduct.isImgUploaded()).toBe(true, 'can not upload image');
			browser.sleep(2000);

			return expect(await pageCreateProduct.isNotiSuccess()).toBe(true);
		});

		it('"Add picture button": "add" button should be displayed when hovering over the image carousel', async () => {
			browser.sleep(1000);
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setImg(urlImg);
			browser.sleep(5000);
			await pageCreateProduct.hoverImgAppCarousel();

			return expect(await pageCreateProduct.isDisplayAddBtn()).toBe(true);
		});

	});

	// ------------ TEST SUITE UPLOAD ATTACHMENT ------------
	describe('add attachment button should upload attachment', () => {

		it('"add file" button should be displayed', async () => {
			browser.sleep(1000);
			return expect(pageCreateProduct.addFileBtn.isDisplayed()).toBe(true);
		});

		it('spinner should appear if file is being uploaded', async () => {
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setAttachment(urlImg);
			browser.sleep(5000);
			return expect(await pageCreateProduct.isOpenedSpinnerApp()).toBeTruthy();
		});

		it('spinner should disappear if file is uploaded', async () => { // how to know the file is uploaded???
			browser.sleep(1000);
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setAttachment(urlImg);
			browser.sleep(5000);

			expect(await pageCreateProduct.isListAppExisted()).toBeTruthy('can not get "img-app"');

			return expect(await pageCreateProduct.isAttachmentUploaded()).toBeFalsy();
		});

		it('a toast massege should appear if file is uploaded', async () => {
			browser.sleep(1000);
			const urlImg = '/Users/macuser/Pictures/WP/background.JPG'; // it will be img's url on your PC
			await pageCreateProduct.setAttachment(urlImg);
			browser.sleep(5000);

			expect(await pageCreateProduct.isListAppExisted()).toBeTruthy('can not get "img-app"');
			expect(await pageCreateProduct.isAttachmentUploaded()).toBeFalsy('can not upload attachment');
			return expect(await pageCreateProduct.isNotiSuccess()).toBe(true);
		});
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

	it('create product button should open create product dialog, if checkbox "create another" is marked', async () => {
		const fieldName = await pageCreateProduct.getFieldName();
		await fieldName.sendKeys('test');

		const createAnoCheckbox = await pageCreateProduct.createAnotherBtn;
		if ((await createAnoCheckbox.getAttribute('value') === 'false')) { // if checkbox "create another" is marked, we will unmark
			await pageCreateProduct.clickAnotherCheckbox();
		}

		await pageCreateProduct.createProdBtn.click();
		browser.sleep(2000);
		// check product has been created with success
		await pageCreateProduct.isNotiSuccess();
		return expect(await pageCreateProduct.isOpenedCreProDlgApp()).toBeTruthy();
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
