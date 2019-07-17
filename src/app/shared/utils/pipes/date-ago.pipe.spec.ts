import { DateToTimeAgoPipe } from './date-ago.pipe';
import * as moment from 'moment';

describe('DateToTimeAgoPipe', () => {
	let pipe: DateToTimeAgoPipe;

	beforeEach(() => {
		pipe = new DateToTimeAgoPipe();
	});

	it('transforms "undefined" to ""', () => {
		expect(pipe.transform(undefined)).toBe('');
	});

	it('transforms "null" to ""', () => {
		expect(pipe.transform(null)).toBe('');
	});

	// type of input is Date
	it('transforms "new Date()" to "just now"', () => {
		expect(pipe.transform(new Date())).toBe('just now');
	});

	it('transforms "date" to "xx seconds ago"', () => {
		const date = moment().seconds(new Date().getSeconds() - 30);
		expect(pipe.transform(date.toDate())).toContain('seconds ago');
	});

	it('transforms "date" to "1 minute ago"', () => {
		const date = moment().minutes(new Date().getMinutes() - 1);
		expect(pipe.transform(date.toDate())).toContain('1 minute ago');
	});

	it('transforms "date" to "xx minutes ago"', () => {
		const date = moment().minutes(new Date().getMinutes() - 2);
		expect(pipe.transform(date.toDate())).toContain(' minutes ago');
	});

	it('transforms "date" to "1 hour ago"', () => {
		const date = moment().hours(new Date().getHours() - 1);
		expect(pipe.transform(date.toDate())).toContain('1 hour ago');
	});

	it('transforms "date" to "xx hours ago"', () => {
		const date = moment().hours(new Date().getHours() - 2);
		expect(pipe.transform(date.toDate())).toContain(' hours ago');
	});

	it('transforms "date" to "1 day ago"', () => {
		const date = moment().date(new Date().getDate() - 1);
		expect(pipe.transform(date.toDate())).toContain('1 day ago');
	});

	it('transforms "date" to "xx days ago"', () => {
		const date = moment().date(new Date().getDate() - 2);
		expect(pipe.transform(date.toDate())).toContain(' days ago');
	});

	it('transforms "date" to "1 month ago"', () => {
		const date = moment().month(new Date().getMonth() - 1).date(new Date().getDate() - 1);
		expect(pipe.transform(date.toDate())).toContain('1 month ago');
	});

	it('transforms "date" to "xx months ago"', () => {
		const date = moment().month(new Date().getMonth() - 2).date(new Date().getDate() - 1);
		expect(pipe.transform(date.toDate())).toContain(' months ago');
	});

	it('transforms "date" to "1 year ago"', () => {
		const date = moment().year(new Date().getFullYear() - 1);
		expect(pipe.transform(date.toDate())).toContain('1 year ago');
	});

	it('transforms "date" to "xx years ago"', () => {
		const date = moment().year(new Date().getFullYear() - 2);
		expect(pipe.transform(date.toDate())).toContain(' years ago');
	});

	// type of input is Number
	it('transforms "time" to "just now"', () => {
		const num = new Date().getTime();
		expect(pipe.transform(num)).toBe('just now');
	});

	it('transforms "time" to "xx seconds ago"', () => {
		const date = moment().seconds(new Date().getSeconds() - 30);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('seconds ago');
	});

	it('transforms "time" to "1 minute ago"', () => {
		const date = moment().minutes(new Date().getMinutes() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('1 minute ago');
	});

	it('transforms "time" to "xx minutes ago"', () => {
		const date = moment().minutes(new Date().getMinutes() - 2);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain(' minutes ago');
	});

	it('transforms "time" to "1 hour ago"', () => {
		const date = moment().hours(new Date().getHours() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('1 hour ago');
	});

	it('transforms "time" to "xx hours ago"', () => {
		const date = moment().hours(new Date().getHours() - 2);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain(' hours ago');
	});

	it('transforms "time" to "1 day ago"', () => {
		const date = moment().date(new Date().getDate() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('1 day ago');
	});

	it('transforms "time" to "xx days ago"', () => {
		const date = moment().date(new Date().getDate() - 2);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain(' days ago');
	});

	it('transforms "time" to "1 month ago"', () => {
		const date = moment().month(new Date().getMonth() - 1).date(new Date().getDate() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('1 month ago');
	});

	it('transforms "time" to "xx months ago"', () => {
		const date = moment().month(new Date().getMonth() - 2).date(new Date().getDate() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain(' months ago');
	});

	it('transforms "time" to "1 year ago"', () => {
		const date = moment().year(new Date().getFullYear() - 1);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain('1 year ago');
	});

	it('transforms "time" to "xx years ago"', () => {
		const date = moment().year(new Date().getFullYear() - 2);
		const num = date.toDate().getTime();
		expect(pipe.transform(num)).toContain(' years ago');
	});
});
