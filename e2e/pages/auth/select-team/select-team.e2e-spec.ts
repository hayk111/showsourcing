import { LoginPage } from '../login/login.po';
import { SelectTeamPage } from './select-team.po';
import { protractor, browser, } from 'protractor';

describe('select team test suite', () => {
	let selectTeamPage: SelectTeamPage;
	let loginPage: LoginPage;

	beforeEach(async () => {
		browser.ignoreSynchronization = true;
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

	afterEach(async () => {
		await browser.restart();
	});


	it('should display spinner after clicking the existing team then should enter app', async () => {

		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(selectTeamPage.pickATeamElem);
		}, 10000);

		browser.sleep(1000);
		await selectTeamPage.firstDivOfUl.click();

		await browser.wait(() => {
			return EC.visibilityOf(selectTeamPage.spinnerElem);
		}, 10000);


		const isUrlDashboard = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /dashboard/.test(url);
		}, 10000);
		return expect(selectTeamPage.spinnerElem.isDisplayed()).toBe(true) && expect(isUrlDashboard).toBe(true);
	});

	it('should navigate to correct link create new team', async () => {
		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(selectTeamPage.pickATeamElem);
		}, 10000);

		await selectTeamPage.createATeamBtn.click();

		const isUrlCreateTeam = await browser.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /create-a-team/.test(url);
		}, 10000);
		return expect(isUrlCreateTeam).toBe(true);
	});

	it('should navigate to correct link log out', async () => {
		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(selectTeamPage.pickATeamElem);
		}, 10000);

		await selectTeamPage.logoutBtn.click();

		const isUrlLogin = await browser.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /login/.test(url);
		}, 10000);
		return expect(isUrlLogin).toBe(true);
	});

});
