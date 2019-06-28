import { browser, by, element, By } from 'protractor';

export class InvitationPage {

	navigateToManageTeams() {
		return browser.get('/settings/team/members');
	}

}
