import { ImagePipe } from './image.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_REQUEST_ICON,
	DEFAULT_CATEGORY_ICON, DEFAULT_PRODUCT_ICON, DEFAULT_PRODUCT_LIST_ICON
} from '~utils/constants';
import { DomSanitizer } from '@angular/platform-browser';

describe('ImagePipe', () => {
	let pipe: ImagePipe;
	// tslint:disable-next-line:prefer-const
	let sanitizer: DomSanitizer;
	beforeEach(() => {
		pipe = new ImagePipe(sanitizer);
	});

	// no value input, no size, has type -> get default logo of type
	it(`transforms (undefined, undefined,"category") to "${DEFAULT_CATEGORY_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'category')).toBe('assets/icons/category.svg');
	});

	it(`transforms (undefined, undefined, "event") to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transforms (undefined, undefined, "product") to "${DEFAULT_PRODUCT_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'product')).toBe('assets/icons/product.svg');
	});

	it(`transforms (undefined, undefined, "product-list") to "${DEFAULT_PRODUCT_LIST_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'product-list')).toBe('assets/icons/product-list.svg');
	});

	it(`transforms (undefined, undefined, "project") to "${DEFAULT_PROJECT_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'project')).toBe('assets/icons/project.svg');
	});

	it(`transforms (undefined, undefined, "request") to "${DEFAULT_REQUEST_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'request')).toBe('assets/icons/request-list.svg');
	});

	it(`transforms (undefined, undefined, "event") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transforms (undefined, undefined, "user") to "${DEFAULT_USER_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'user')).toBe('assets/icons/user.svg');
	});

	// no value input, size, type -> get default logo of type
	it(`transforms (undefined, undefined, undefined) to "${DEFAULT_IMG}"`, () => {
		expect(pipe.transform(undefined, undefined, undefined)).toBe('assets/icons/image.svg');
	});

	// no value input, has size and type
	it(`transforms (undefined, 'xs',"category") to "${DEFAULT_CATEGORY_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'category')).toBe('assets/icons/category.svg');
	});

	it(`transforms (undefined, 'xl', "event") to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

});
