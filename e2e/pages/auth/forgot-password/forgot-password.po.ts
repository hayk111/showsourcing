import { browser, by, element } from 'protractor';

export class ForgotPwPage {

	navigateTo() {
		return browser.get('/auth/forgot-password');
	}

	async submit(email: string) {
		const emailInp = element(by.css('input[name="email"]'));
		await emailInp.sendKeys(email);

		const btn = element(by.css('input[type="submit"]'));

		await btn.click();
	}

	get errorElem() {
		return element(by.tagName('error-app'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

	get pwResettedElem() {
		return element(by.tagName('pw-resetted-app'));
	}

}
