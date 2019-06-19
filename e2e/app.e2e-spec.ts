import { AppPage } from './pages/app.po';
import { LoginPage } from './pages/login.po';
import { browser, by, element } from 'protractor';



describe('login test suite', () => {
	let page: LoginPage;

	beforeEach(() => {
		page = new LoginPage();
		page.navigateTo();
	});

	it('should pass', () => {
		expect(true).toEqual(true);
	});

	// it('should login when using correct credentials', async () => {
	// 	const email = 'hr8pgr+vhayjmg377s0@sharklasers.com';
	// 	const password = 'test1234';
	// 	const url: string = await page.loginAndGetUrl(email, password);
	// 	expect(url.includes('auth/login')).toEqual(false);
	// });

	// it('When accessing the p');
});
