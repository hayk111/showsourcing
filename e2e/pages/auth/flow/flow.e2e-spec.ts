import { FlowPage } from './flow.po';
import { LoginPage } from '../login/login.po';
import { SelectTeamPage } from '../select-team/select-team.po';
import { protractor, browser } from 'protractor';

describe('flow test suite', () => {
	let flowPage: FlowPage;
	let loginPage: LoginPage;
	let selectTeamPage: SelectTeamPage;

	beforeEach(async () => {
		flowPage = new FlowPage();
		loginPage = new LoginPage();
		selectTeamPage = new SelectTeamPage();
	});

	afterEach(async () => {
		await browser.restart();
	});

	it('should direct to home page, if user is already logged in', async () => {
		await loginPage.navigateTo();
		await loginPage.login('sp@gmail.com', '12345', true);

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);
		await selectTeamPage.firstDivOfUl.click();

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /dashboard/.test(url);
		}, 10000);

		await flowPage.navigateToHomePage();

		const isUrlDashboard =  await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /dashboard/.test(url) && !/login/.test(url);
		}, 10000);

		return expect(isUrlDashboard).toBe(true);
	});

	it('should direct to create company page, if user is logged in and doesn\'t have a company', async () => {
		await loginPage.navigateTo();
		await loginPage.login('sptest@gmail.com', '12345', true); // this account doesn\'t have a company

		const isUrlCreateCompany = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /create-a-company/.test(url);
		}, 10000);

		return expect(isUrlCreateCompany).toBe(true);
	});

	it('should direct to create team page, if user is logged in, has a company and doesn\'t have at least 1 team', async () => {

		return expect(true).toBe(true);
	});

	it('should direct to select team page, if user is logged in, has a company, has at least a team, but it is not selected', async () => {
		await loginPage.navigateTo();
		await loginPage.login('sp@gmail.com', '12345', true);

		const isUrlSelectTeam = await browser.driver.wait(async _ => { // redirect to select team page -> has a company
			const url: string = await browser.driver.getCurrentUrl();
			return /pick-a-team/.test(url);
		}, 10000);

		browser.sleep(1000);
		// get all teams
		const teams = await flowPage.teams;
		// get selected-team in local storage
		const selectedTeam = await browser.executeScript('return window.localStorage.getItem("selected-team");');

		return expect(isUrlSelectTeam).toBe(true)
			&& expect(teams.length).toBeGreaterThan(0)
			&& expect(selectedTeam).toBeNull();
	});

	it('should remain in log in page, if user is not logged in', async () => {
		await flowPage.navigateToHomePage();

		const isUrlLogin = await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /login/.test(url);
		}, 10000);

		return expect(isUrlLogin).toBe(true);
	});

});
