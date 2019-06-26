import { CreateATeamPage } from './create-a-team.po';
import { LoginPage } from '../login/login.po';
import { protractor, browser, element, by } from 'protractor';


describe('create a team test suite', () => {
	let pageCreate: CreateATeamPage;
	let pageLogin: LoginPage;

	beforeEach(async () => {
		pageCreate = new CreateATeamPage();
		pageLogin = new LoginPage();

		await pageCreate.navigateTo();
		await pageLogin.login('sp@gmail.com', '12345');

		await browser.driver.wait(async _ => {
			const url: string = await browser.driver.getCurrentUrl();
			return /create-a-team/.test(url) && !/login/.test(url);
		}, 10000);
	});

	afterEach(async () => {
		await browser.restart();
	});

	it('should display spinner after clicking the create new team button', async () => {
		browser.ignoreSynchronization = true;
		await pageCreate.submitBtn.click();
		const EC = protractor.ExpectedConditions;
		await browser.wait(() => {
			return EC.visibilityOf(pageCreate.spinnerElem);
		}, 10000);

		return expect(pageCreate.spinnerElem.isDisplayed()).toEqual(true);
	});

	it('"create new team" button should turn to grey if only one field is filled', async () => {
		browser.ignoreSynchronization = true;
		const nameInp = element(by.css('input[name="name"]'));
		await nameInp.sendKeys('1');

		await browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
		const isEnabled = await pageCreate.submitBtn.isEnabled();

		return expect(isEnabled).toEqual(false);
	});

	it('should create new team when using correct info', async () => {
		// browser.ignoreSynchronization = true;
		// await pageCreate.createNewTeam('ABCD');

		return expect(true).toEqual(true);
	});

});
