import { browser, by, element } from 'protractor';

export class SelectTeamPage {

	get pickATeamElem() {
		return element(by.tagName('pick-a-team-page-app'));
	}

	get ulElem() {
		return element(by.tagName('ul'));
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

	get createATeamBtn() {
		return element(by.id('createATeam'));
	}

	get logoutBtn() {
		return element(by.id('logout'));
	}

	get firstDivOfUl() {
		return browser.driver.findElement(by.xpath('.//*[@id="teams"]/div[1]')); // get 1st team
	}

}
