import { browser, by, element, protractor } from 'protractor';

export class RegisterPage {

	navigateTo() {
		return browser.get('/auth/register');
	}

	async register(firstName: string, lastName: string, email: string, password: string) {
		const firstNameInp = element(by.css('input[name="firstName"]'));
		const lastNameInp = element(by.css('input[name="lastName"]'));
		const emailInp = element(by.css('input[name="email"]'));
		const pwInp = element(by.css('input[name="password"]'));

		await firstNameInp.sendKeys(firstName);
		await lastNameInp.sendKeys(lastName);
		await emailInp.sendKeys(email);
		await pwInp.sendKeys(password);

		const btn = element(by.css('input[type="submit"]'));

		await btn.click();
	}

	async sendKey(value: string, elemCss: string) {
		const elem = element(by.css(elemCss));
		await elem.sendKeys(value);
	}

	get errorElem() {
		return element(by.tagName('error-app'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

}
