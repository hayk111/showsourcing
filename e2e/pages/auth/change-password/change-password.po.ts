import { browser, by, element, By } from 'protractor';

export class ChangePasswordPage {

	navigateTo() {
		return browser.get('/dashboard');
	}

	navigateToProfile() {
		return browser.get('/settings/profile');
	}

	async completeFormChangePw(curPw: string, newPw: string, confirmPw: string, isSubmit: boolean) {
		const curPwInp = browser.driver.findElement(by.id('inp-7'));
		const newPwInp = browser.driver.findElement(by.id('inp-8'));
		const confirmPwInp = browser.driver.findElement(by.id('inp-9'));

		await curPwInp.sendKeys(curPw);
		await newPwInp.sendKeys(newPw);
		await confirmPwInp.sendKeys(confirmPw);

		if (isSubmit) {
			await this.submitBtn.click();
		}
	}

	async completeOnBoarding() {
		for (let i = 0; i < 4; i++) { // 4 is number of slides
			await this.onBoardingNextBtn.click();
		}
		await this.onBoardingSuccessBtn.click();
	}

	get submitBtn() {
		return browser.driver.findElement(by.css('input[type="submit"]'));
	}

	get changePwBtn() {
		return browser.driver.findElement(by.css('button.auto'));
	}

	get profileCardElem() {
		return browser.driver.findElement(by.tagName('profile-card-app'));
	}

	get firstDivOfUl() {
		return browser.driver.findElement(by.xpath('.//*[@id="teams"]/div[1]')); // get 1st team
	}

	get spinnerElem() {
		return browser.driver.findElement(by.tagName('spinner-app'));
	}

	get onBoardingElem() {
		return browser.driver.findElement(by.tagName('on-boarding-dlg-app'));
	}

	get onBoardingNextBtn() {
		return browser.driver.findElement(by.css('button.ng-star-inserted'));
	}

	get onBoardingSuccessBtn() {
		return browser.driver.findElement(by.css('button.success'));
	}

	get errorElem() {
		return browser.driver.findElement(by.tagName('error-app'));
	}

	get warnInp() {
		return browser.driver.findElement(by.css('p.color-warn'));
	}
}
