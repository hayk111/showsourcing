import { LoginPage } from './login.po';
import { protractor, browser } from 'protractor';


describe('login test suite', () => {
	let page: LoginPage;

	beforeEach(async () => {
		page = new LoginPage();
		await page.navigateTo();
	});

	it('submit button should be disabled if form is invalid', async () => {
		await browser.debugger();
		const email = 'special-character%>.#@gmail.com';
		const password = '11111111';
		await page.login(email, password, false);

		return expect(page.submitBtn.isEnabled()).toBe(false);
	});

	it('should display spinner after clicking the sign in button', async () => {
		await browser.debugger();
		browser.ignoreSynchronization = true;

		const email = 'sp123@gmail.com';
		const password = '12345';
		await page.login(email, password, true);

		const EC = protractor.ExpectedConditions;
		await browser.wait(EC.visibilityOf(page.spinnerElem), 5000);

		return expect(page.spinnerElem.isDisplayed()).toBe(true).then(() => browser.ignoreSynchronization = false);
	});

	it('should display error message when incorrect credentials', async () => {
		await browser.debugger();
		browser.ignoreSynchronization = true;

		const email = 'false-email@false-provider.com';
		const password = 'false-password-1';
		await page.login(email, password, true);

		const EC = protractor.ExpectedConditions;
		// await browser.wait(() => {
		// 	return EC.visibilityOf(page.errorElem);
		// }, 10000);
		await browser.wait(EC.visibilityOf(page.errorElem), 5000);
		return expect(page.errorElem.getText()).toEqual('Incorrect credentials').then(() => browser.ignoreSynchronization = false);
	});

	it('should login when using correct credentials', async () => {
		const email = 'hr8pgr+vhayjmg377s0@sharklasers.com';
		const password = 'test1234';

		await page.login(email, password, true);
		const hasLeftLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return !/login/.test(url);
		}, 10000);
		return expect(hasLeftLogin).toEqual(true);
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

	it('should navigate to correct link register', async () => {
		await page.registerElem.click();

		const isUrlRegister = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /register/.test(url);
		}, 10000);
		return expect(isUrlRegister).toEqual(true);
	});

	it('should redirect to return page if already logged in', async () => {
		const email = 'sp@gmail.com';
		const password = '12345';
		await page.login(email, password, true);

		await browser.driver.wait(async _ => { // wait until the browser has left login page
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return !/login/.test(url);
		}, 10000);

		await page.navigateToPickATeam();

		const isUrlPickATeam = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			if (/pick-a-team/.test(url) && !/login/.test(url)) {
				console.log(url)
			}
			return /pick-a-team/.test(url) && !/login/.test(url);
		}, 10000);
		return expect(isUrlPickATeam).toEqual(true);
	});

});
