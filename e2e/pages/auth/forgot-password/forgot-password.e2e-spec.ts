import { ForgotPwPage } from './forgot-password.po';
import { protractor, browser, element, by } from 'protractor';

describe('forgot password test suite', () => {
	let page: ForgotPwPage;

	beforeEach(async () => {
		page = new ForgotPwPage();
		await page.navigateTo();
	});

	it('should display spinner after clicking the send button', async () => {
		browser.ignoreSynchronization = true;
		await page.submit('sp@gmail.com');

		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(page.spinnerElem);
		}, 10000);

		return expect(page.spinnerElem.isDisplayed()).toBe(true);
	});

	it('send button should turn grey when incorrect email', async () => {
		await page.submit('special-character%>.#@gmail.com');

		const btn = element(by.css('input[type="submit"]'));
		const isEnabled = btn.isEnabled();

		return expect(isEnabled).toBe(false);
	});

	it('should send when using correct credentials', async () => {
		browser.ignoreSynchronization = true;
		await page.submit('sp@gmail.com');

		const isUrlPwReset = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /password-resetted/.test(url);
		}, 10000);

		return expect(isUrlPwReset).toBe(true);
	});

	it('should navigate to correct link (log in)', async () => {
		browser.ignoreSynchronization = true;
		await page.submit('sp@gmail.com');

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /password-resetted/.test(url);
		}, 10000);

		const btn = element(by.tagName('button'));
		await btn.click();

		const isUrlLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /login/.test(url);
		}, 10000);

		return expect(isUrlLogin).toBe(true);
	});

});
