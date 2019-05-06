import { Screen } from './on-boarding.service';


// TODO i18n
export const SCREENS: Screen[] = [
	{
		picture: 'onboarding-1.svg',
		title: 'Welcome to ShowSourcing!',
		text: 'ShowSourcing is a powerful collaborative tool to boost your product development processes',
	}, {
		picture: 'onboarding-2.svg',
		title: 'Work on the go',
		text: `Tired of taking notes manually and spending your evenings transcribing data into excel sheets?
ShowSourcing's mobile app will help you take notes efficiently while attending a trade show or a factory visit.`
	}, {
		picture: 'onboarding-3.svg',
		title: 'Centralize your data',
		text: `Having trouble sharing data between colleagues, teams or offices?
Invite your entire team - purchasers, marketers, and more - and share all your findings instantenously.`
	}, {
		picture: 'onboarding-4.svg',
		title: 'Communicate with your suppliers',
		text: `Integrate your supplier in your product development, ask the mquestions, request quote, information and much more!`
	}, {
		picture: 'onboarding-5.svg',
		title: 'Make Better Decisions, Faster',
		text: 'No more quick and dirty decision making.  Easily benchmark products, visualize your entire process,'
			+ ' and determine market fit all in one place.'
	},

];
