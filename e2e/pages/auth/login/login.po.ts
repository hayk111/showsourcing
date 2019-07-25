import { browser, by, element } from 'protractor';

export class LoginPage {

	navigateTo() {
		return browser.get('/auth/login');
	}

	navigateToPickATeam() {
		return browser.get('/user/pick-a-team');
	}

	async login(email: string, password: string, isSubmit: boolean) {
		const emailInp = element(by.css('input[name="login"]'));
		const pwInp = element(by.css('input[name="password"]'));
		await emailInp.sendKeys(email);
		await pwInp.sendKeys(password);
		if (isSubmit) {
			await this.submitBtn.click();
		}
	}

	get submitBtn() {
		return element(by.css('input[type="submit"]'));
	}

	get errorElem() {
		return element(by.tagName('error-app'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

	get forgotPwElem() {
		return element(by.className('forgot-password'));
	}

	get registerElem() {
		return element(by.tagName('a'));
	}

}
