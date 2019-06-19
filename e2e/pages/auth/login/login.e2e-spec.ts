import { LoginPage } from './login.po';
import { protractor, browser } from 'protractor';


describe('login test suite', () => {
	let page: LoginPage;

	beforeEach(async () => {
		page = new LoginPage();
		await page.navigateTo();
	});

	it('should display error message when incorrect credentials', async () => {
		await browser.debugger();
		const email = 'false-email@false-provider.com';
		const password = 'false-password';
		await page.login(email, password);
		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(page.errorElem);
		}, 10000);
		return expect(page.errorElem.getText()).toEqual('Incorrect credentials');
	});

	it('should login when using correct credentials', async () => {
		const email = 'hr8pgr+vhayjmg377s0@sharklasers.com';
		const password = 'test1234';
		
		page.login(email, password);
		const hasLeftLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return !/login/.test(url);
		}, 10000);
		return expect(hasLeftLogin).toEqual(true);
	});

});
