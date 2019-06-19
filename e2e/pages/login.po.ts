import { browser, by, element } from 'protractor';

export class LoginPage {

	navigateTo() {
		return browser.get('/auth/login');
	}

	loginAndGetUrl(email: string, password: string): Promise<string> {
		const emailInp = element(by.css('input[name="login"]'));
		const pwInp = element(by.css('input[name="password"]'));
		const btn = element(by.css('input[type="submit"]'));
		emailInp.sendKeys('hr8pgr+vhayjmg377s0@sharklasers.com');
		pwInp.sendKeys('test1234');
		btn.click();
		return new Promise(resolve => {
			browser.driver.wait(_ => resolve(browser.getCurrentUrl()), 5000);
		});
	}
}
