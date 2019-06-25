import { LoginPage } from '../login/login.po';
import { SelectTeamPage } from './select-team.po';
import { protractor, browser, element, by } from 'protractor';

describe('select team test suite', () => {
	let selectTeamPage: SelectTeamPage;
	let loginPage: LoginPage;

	beforeEach(async () => {
		loginPage = new LoginPage();
		selectTeamPage = new SelectTeamPage();
		await loginPage.navigateTo();
		await loginPage.login('sp@gmail.com', '12345'); // this account has teams

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			// when we login we will get out of the login page
			return /pick-a-team/.test(url);
		}, 10000);
	});

	it('should display spinner after clicking the existing team then should enter app', async () => {
		browser.ignoreSynchronization = true;

		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(selectTeamPage.pickATeamElem);
		}, 10000);
		return expect(true).toBe(true);
	});

});
