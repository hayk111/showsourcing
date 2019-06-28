import { browser, by, element } from 'protractor';

export class FlowPage {

	navigateToHomePage() {
		return browser.get('/dashboard');
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

	get teams() {
		return browser.driver.findElements(by.xpath('.//*[@id="teams"]/div'));
	}

}
