import { browser, by, element } from 'protractor';

export class CreateATeamPage {
	async navigateTo() {
		return browser.get('user/create-a-team');
	}

	async createNewTeam(name: string) {
		const nameInp = element(by.css('input[name="name"]'));
		await nameInp.sendKeys(name);

		const btn = this.submitBtn;
		await btn.click();
	}

	get spinnerElem() {
		return element(by.tagName('spinner-app'));
	}

	get submitBtn() {
		return element(by.css('input[type="submit"]'));
	}

	get createATeamElem() {
		return element(by.tagName('create-a-team-page-app'));
	}

}
