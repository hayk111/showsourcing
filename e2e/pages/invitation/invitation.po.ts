import { browser, by, element, By } from 'protractor';

export class InvitationPage {

	navigateToManageTeams() {
		return browser.get('/settings/team/members');
	}

	async inviteUser(email: string) {
		const inviteUserDlg = await this.inviteUserDlg;
		const emailInp = await inviteUserDlg.findElement(by.css('input.ng-pristine'));
		if (await emailInp.isDisplayed()) {
			await emailInp.sendKeys(email);

			const footerApp = await browser.driver.findElement(by.tagName('dialog-footer-app'));
			const btn = await footerApp.findElement(by.css('button.small'));

			if (await btn.isDisplayed()) {
				await btn.click();
			} else {
				console.log('can not get btn Invite of ialog-footer-app');
			}
		} else {
			console.log('can not get email inp of invite-user-dlgapp');
		}
	}

	get inviteUserDlg() {
		return browser.driver.findElement(by.tagName('invite-user-dlgapp'));
	}

	get subPanelRightApp() {
		return browser.driver.findElement(by.tagName('sub-panel-right-item-app'));
	}

	get notificationApp() {
		return browser.driver.findElement(by.tagName('notification-app'));
	}

	async isNotiSuccess() {
		const notificationApp = await browser.driver.wait(async _ => {
			return browser.driver.findElement(by.tagName('notification-app'));
		}, 10000);

		if (await notificationApp.isDisplayed()) {
			return await notificationApp.findElement(by.css('div.success')).isDisplayed();
		} else {
			console.log('can not get notification-app');
			return false;
		}
	}

	async inviteBtn() {
		const subPanel = await this.subPanelRightApp;
		const btns = await subPanel.findElements(by.css('button'));
		return btns[0];
	}
}
