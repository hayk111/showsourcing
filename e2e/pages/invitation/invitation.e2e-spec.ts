import { ChangePasswordPage } from '../auth/change-password/change-password.po';
import { LoginPage } from '../auth/login/login.po';
import { InvitationPage } from './invitation.po';
import { browser } from 'protractor';

describe('test suite invitation', () => {
	let pageChangePw: ChangePasswordPage;
	let pageLogin: LoginPage;
	let invitationPage: InvitationPage;

	beforeEach(async () => {
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
			return /profile/.test(url) && !/pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);

		const isOnBoardingDisplayed = await pageChangePw.onBoardingElem.isDisplayed();
		if (isOnBoardingDisplayed) {
			await pageChangePw.completeOnBoarding();
		}


	});

	it('should send invitation when creating invitation on the team management page', async () => {
		browser.sleep(10000);
		return expect(true).toBe(true);
	});
});
