import { LogoPipe } from './logo.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_SUPPLIER_PROD_ICON
} from '~utils/constants';

describe('LogoPipe', () => {
	let pipe: LogoPipe;

	beforeEach(() => {
		pipe = new LogoPipe();
	});

	// no value input -> get default logo
	it(`transforms (undefined, "supplier") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(undefined, 'supplier')).toBe('assets/icons/supplier.svg');
	});

	it(`transforms (undefined, "user") to ${DEFAULT_USER_ICON}`, () => {
		expect(pipe.transform(undefined, 'user')).toBe('assets/icons/user.svg');
	});

	it(`transforms (undefined, "event") to ${DEFAULT_EVENT_ICON}`, () => {
		expect(pipe.transform(undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transforms (undefined, "project") to ${DEFAULT_PROJECT_ICON}`, () => {
		expect(pipe.transform(undefined, 'project')).toBe('assets/icons/project.svg');
	});

	it(`transforms (undefined, "category") to ""`, () => {
		expect(pipe.transform(undefined, 'category')).toBeFalsy();
	});

	it(`transforms (undefined, "supplierType") to ""`, () => {
		expect(pipe.transform(undefined, 'supplierType')).toBeFalsy();
	});

	it(`transforms (undefined, "supplier-product") to ${DEFAULT_SUPPLIER_PROD_ICON}`, () => {
		expect(pipe.transform(undefined, 'supplier-product')).toBe('assets/icons/supplier-purple.svg');
	});

	// no value, no type
	it(`transforms (undefined, undefined) to ""`, () => {
		expect(pipe.transform(undefined)).toBeFalsy();
	});

});
