import { ChangePasswordPage } from './change-password.po';
import { LoginPage } from '../login/login.po';
import { browser } from 'protractor';


describe('change password test suite', () => {
	let pageChangePw: ChangePasswordPage;
	let pageLogin: LoginPage;

	beforeEach(async () => {
		pageChangePw = new ChangePasswordPage();
		pageLogin = new LoginPage();
		await pageChangePw.navigateToProfile();
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

		await pageChangePw.profileCardElem.isDisplayed();
		await pageChangePw.changePwBtn.click();
	});

	afterEach(async () => {
		await browser.restart();
	});

	it('should display spinner after clicking the change button', async () => {
		await pageChangePw.completeFormChangePw('12345', '123456789', '123456789', true);

		return expect(pageChangePw.spinnerElem.isDisplayed()).toEqual(true);
	});

	it('change button should turn blue when credentials are filled', async () => {
		await pageChangePw.completeFormChangePw('12345', '123456789', '123456789', false);
		return expect(pageChangePw.submitBtn.isEnabled()).toEqual(true);
	});

	it('should display "Minimum 8 characters required" if credentials are less then 8', async () => {
		await pageChangePw.completeFormChangePw('12345', '1234567', '1234567', false);
		await pageChangePw.warnInp.isDisplayed();

		return expect(pageChangePw.warnInp.getText()).toEqual('Minimum 8 characters required');
	});

	it('should display "New password must match" if incorrect credentials in confirm password field', async () => {
		await pageChangePw.completeFormChangePw('12345', '1234567', '123456789', false);
		await pageChangePw.warnInp.isDisplayed();
		return expect(pageChangePw.warnInp.getText()).toEqual('New password must match');
	});

	it('should change when using correct credentials', async () => {
		await pageChangePw.completeFormChangePw('12345', '123456789', '123456789', true);

		return expect(false).toBe(true);
	});

	it('should navigate to correct links (log in)', async () => {
		await pageChangePw.completeFormChangePw('12345', '123456789', '123456789', true);

		return expect(false).toBe(true);
	});

});
