import { ChangePasswordPage } from '../auth/change-password/change-password.po';
import { LoginPage } from '../auth/login/login.po';
import { InvitationPage } from './invitation.po';
import { browser } from 'protractor';

describe('test suite invitation', () => {
	let pageChangePw: ChangePasswordPage;
	let pageLogin: LoginPage;
	let invitationPage: InvitationPage;

	// beforeEach(async () => {
	// });

	afterEach(async () => {
		await browser.restart();
	});

	it('should send invitation when creating invitation on the team management page', async () => {
		pageChangePw = new ChangePasswordPage();
		pageLogin = new LoginPage();
		invitationPage = new InvitationPage();
		await invitationPage.navigateToManageTeams();
		await pageLogin.login('sp@gmail.com', '12345', true);

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);

		await pageChangePw.firstDivOfUl.click();
		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /\/settings\/team\/members/.test(url) && !/pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);

		const isOnBoardingDisplayed = await pageChangePw.onBoardingElem.isDisplayed();
		browser.sleep(1000);
		if (isOnBoardingDisplayed) {
			await pageChangePw.completeOnBoarding();
		}

		const inviteBtn = await invitationPage.inviteBtn();
		await inviteBtn.click();

		await invitationPage.inviteUser('ss.test1.anttech@gmail.com'); // this email doesn't have

		browser.sleep(1000);

		const isSuccess = await invitationPage.isNotiSuccess();
		return expect(isSuccess).toBe(true);
	});

	it('should ask to login / register when going on the invitation link as a new user', async () => {
		const mailListener = await invitationPage.startMailListener('ss.test1.anttech@gmail.com', 'AntTech2017');
		if (mailListener) {
			const mail: any = await browser.controlFlow().wait(_ => {
				return invitationPage.getLastEmail(mailListener);
			}, 10000);

			if (mail) {
				const headers = mail.headers;
				if (headers.senderemail === 'info@showsourcing.com') {
					expect(headers.senderemail).toContain('info@showsourcing.com');

					const hrefs = mail.html.toString().match(/<a.*?>/g);

					if (hrefs && hrefs.length) {
						const link = hrefs[0].match(/href="([^"]*)/);
						if (link[1] && link[1].length) {
							await invitationPage.navigateToLink(link[1]);

							const isUrlInvitation = await browser.driver.wait(async _ => {
								const url: string = await browser.driver.getCurrentUrl();
								return /accept-invite/.test(url);
							}, 10000);

							if (isUrlInvitation) {
								const btns = await invitationPage.btnOfInvitationApp;
								await invitationPage.stopMailListener;
								return expect(btns.length).toBeGreaterThan(1);
							} else {
								fail('can not go to page accept-invite');
							}

						}
					} else {
						fail('can not get hrefs');
					}
				} else {
					await invitationPage.stopMailListener;
					fail('failed to get email of info@showsourcing.com');
				}
			} else {
				await invitationPage.stopMailListener;
				fail('can not get email');
			}
		} else {
			await invitationPage.stopMailListener;
			fail('can not start mailListener');
		}
	});

	it('should get on the invitation acceptation page when going on the invitation link as an existing user', async () => {
		const mailListener = await invitationPage.startMailListener('ss.test1.anttech@gmail.com', 'AntTech2017');
		if (mailListener) {
			const mail: any = await browser.controlFlow().wait(_ => {
				return invitationPage.getLastEmail(mailListener);
			}, 10000);

			if (mail) {
				const headers = mail.headers;
				if (headers.senderemail === 'info@showsourcing.com') {
					expect(headers.senderemail).toContain('info@showsourcing.com');

					const hrefs = mail.html.toString().match(/<a.*?>/g);

					if (hrefs && hrefs.length) {
						const link = hrefs[0].match(/href="([^"]*)/);
						if (link[1] && link[1].length) {
							await invitationPage.navigateToLink(link[1]);

							const isUrlInvitation = await browser.driver.wait(async _ => {
								const url: string = await browser.driver.getCurrentUrl();
								return /accept-invite/.test(url);
							}, 10000);

							await invitationPage.stopMailListener;
							return expect(isUrlInvitation).toBeGreaterThan(1);
						}
					} else {
						fail('can not get hrefs');
					}
				} else {
					await invitationPage.stopMailListener;
					fail('failed to get email of info@showsourcing.com');
				}
			} else {
				await invitationPage.stopMailListener;
				fail('can not get email');
			}
		} else {
			await invitationPage.stopMailListener;
			fail('can not start mailListener');
		}
	});

});
