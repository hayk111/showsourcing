import { browser, by, element, protractor } from 'protractor';
declare function require(name: string);
const MailListener = require('mail-listener2');
export class InvitationPage {

	navigateToManageTeams() {
		return browser.get('/settings/team/members');
	}

	navigateToLink(link: string) {
		return browser.get(link);
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
				console.log('can not get btn Invite of dialog-footer-app');
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

	get btnOfInvitationApp() {
		const handleInvitationApp = browser.driver.findElement(by.tagName('handle-invitation-app'));
		return handleInvitationApp.findElements(by.css('button.secondary'));
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

	startMailListener(email: string, password: string) {
		return new Promise((resolve, reject) => {
			const time = new Date().getTime();
			const mailListener = new MailListener({
				username: email,
				password: password,
				host: 'imap.gmail.com',
				port: 993, // imap port
				secure: true,
				tls: true,
				connTimeout: 10000, // Default by node-imap
				authTimeout: 5000, // Default by node-imap,
				debug: console.log,
				tlsOptions: {
					rejectUnauthorized: false
				},
				mailbox: 'INBOX',
				searchFilter: ['UNSEEN', ['SINCE', time], ['FROM', 'info@showsourcing.com']],
				fetchUnreadOnStart: true,
			});
			mailListener.start();

			mailListener.on('server:connected', () => {
				console.log('Mail listener initialized');
				resolve(mailListener);
			});

			mailListener.on('error', (err) => {
				console.log(err);
			});

			mailListener.on('server:disconnected', () => {
				console.log('imapDisconnected');
				reject();
			});

		});
	}

	stopMailListener(mailListener) {
		mailListener.stop();
	}

	getLastEmail(mailListener) {
		const deferred = protractor.promise.defer();
		console.log('Waiting for an email...');

		mailListener.on('mail', mail => {
			deferred.fulfill(mail);
		});
		return deferred.promise;
	}

}
