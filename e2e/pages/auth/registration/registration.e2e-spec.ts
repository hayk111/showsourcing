import { RegisterPage } from './registration.po';
import { protractor, browser } from 'protractor';

describe('register test suite', () => {
	let page: RegisterPage;

	beforeEach(async () => {
		page = new RegisterPage();
		await page.navigateTo();
	});

	it('should display spinner after clicking the sign up button', async () => {
		await browser.debugger();
		browser.ignoreSynchronization = true;

		const firstName = 'Joseph';
		const lastName = 'NGUYEN';
		const email = 'sp@gmail.com';
		const password = '12345';
		await page.register(firstName, lastName, email, password, true);

		const EC = protractor.ExpectedConditions;
		await browser.wait(EC.visibilityOf(page.spinnerElem));

		return expect(page.spinnerElem.isDisplayed()).toBe(true);
	});

	it('should display error msg when incorrect credentials', async () => {
		const firstName = ' ';
		const lastName = ' ';
		const email = ' ';
		const password = ' ';

		await page.register(firstName, lastName, email, password, false);

		return expect(page.errorMessElem.count()).toBeGreaterThan(3);
	});

	it('should sign up when using correct credentials', async () => {
		const firstName = 'Joseph';
		const lastName = 'NGUYEN';
		const email = 'sptest12345@gmail.com';
		const password = '123456789';

		await page.register(firstName, lastName, email, password, true);

		const isUrlCreateCompany = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /create-a-company/.test(url);
		}, 10000);
		return expect(isUrlCreateCompany).toBe(true);
	});

	it('should navigate to correct link forgot password', async () => {
		browser.ignoreSynchronization = true;
		await page.forgotPwElem.click();

		const isUrlForgotPw = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /forgot-password/.test(url);
		}, 10000);
		return expect(isUrlForgotPw).toEqual(true);
	});

	it('should navigate to correct link already have account', async () => {
		browser.ignoreSynchronization = true;
		await page.alHaveAccBtn.click();

		const isUrlLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /login/.test(url);
		}, 10000);
		return expect(isUrlLogin).toEqual(true);
	});

	it('should display "An account already exist with this email address." when using existing email', async () => {
		const firstName = 'Joseph';
		const lastName = 'NGUYEN';
		const email = 'sp123@gmail.com';
		const password = '12345';
		await page.register(firstName, lastName, email, password, true);

		const EC = protractor.ExpectedConditions;
		await browser.wait(EC.visibilityOf(page.errorElem));

		return expect(page.errorElem.getText()).toEqual('An account already exist with this email address.');
	});
});


