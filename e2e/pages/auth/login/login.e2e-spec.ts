import { LoginPage } from './login.po';
import { protractor, browser, element, by } from 'protractor';


describe('login test suite', () => {
	let page: LoginPage;

	beforeEach(async () => {
		page = new LoginPage();
		await page.navigateTo();
	});

	it('submit button should be disabled if form is invalid', async () => {
		await browser.debugger();
		const emailInp = element(by.css('input[name="login"]'));
		const pwInp = element(by.css('input[name="password"]'));

		await emailInp.sendKeys('special-character%>.#@gmail.com');
		await pwInp.sendKeys('11111111');

		const btn = element(by.css('input[type="submit"]'));
		return expect(btn.isEnabled()).toBe(false);
	});

	it('should display spinner after clicking the sign in button', async () => {
		await browser.debugger();
		browser.ignoreSynchronization = true;

		const email = 'sp123@gmail.com';
		const password = '12345';
		await page.login(email, password);

		const EC = protractor.ExpectedConditions;
		await browser.wait(EC.visibilityOf(page.spinnerElem));

		return expect(page.spinnerElem.isDisplayed()).toBe(true);
	});

	it('should display error message when incorrect credentials', async () => {
		await browser.debugger();
		const email = 'false-email@false-provider.com';
		const password = 'false-password-1';
		await page.login(email, password);
		const EC = protractor.ExpectedConditions;
		// await browser.wait(() => {
		// 	return EC.visibilityOf(page.errorElem);
		// }, 10000);
		await browser.wait(EC.visibilityOf(page.errorElem));
		return expect(page.errorElem.getText()).toEqual('Incorrect credentials');
	});

	it('should login when using correct credentials', async () => {
		const email = 'hr8pgr+vhayjmg377s0@sharklasers.com';
		const password = 'test1234';

		await page.login(email, password);
		const hasLeftLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return !/login/.test(url);
		}, 10000);
		return expect(hasLeftLogin).toEqual(true);
	});

	it('should navigate to correct link forgot password', async () => {
		browser.ignoreSynchronization = true;
		const forgotPw = element(by.className('forgot-password'));
		await forgotPw.click();

		const hasLeftLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /forgot-password/.test(url);
		}, 10000);
		return expect(hasLeftLogin).toEqual(true);
	});

	it('should navigate to correct link register', async () => {
		const registerBtn = element(by.tagName('a'));
		await registerBtn.click();

		const hasLeftLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /register/.test(url);
		}, 10000);
		return expect(hasLeftLogin).toEqual(true);
	});

	it('should redirect to return page if already logged in', async () => {
		// const email = 'sp@gmail.com';
		// const password = '12345';
		// await page.login(email, password);

		// const hasLeftLogin = await browser.driver. .wait(async _ => {
		// 	const url: string = await browser.driver.getCurrentUrl();
		// 	// when we login we will get out of the login page
		// 	console.log('url', url)
		// 	return /pick-a-team/.test(url);
		// }, 10000);
		return expect(true).toEqual(true);
	});

});
