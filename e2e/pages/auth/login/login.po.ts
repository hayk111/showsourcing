import { browser, by, element } from 'protractor';

export class LoginPage {

	navigateTo() {
		return browser.get('/auth/login');
	}

	async login(email: string, password: string) {
		const emailInp = element(by.css('input[name="login"]'));
		const pwInp = element(by.css('input[name="password"]'));
		const btn = element(by.css('input[type="submit"]'));
		await emailInp.sendKeys(email);
		await pwInp.sendKeys(password);
		await btn.click();
	}

	get errorElem() {
		return element(by.tagName('error-app'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

}
