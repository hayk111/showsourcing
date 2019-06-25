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
}
