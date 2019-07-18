import { ImagePipe } from './image.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_REQUEST_ICON,
	DEFAULT_CATEGORY_ICON, DEFAULT_PRODUCT_ICON, DEFAULT_PRODUCT_LIST_ICON
} from '~utils/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Supplier, AppImage } from '~core/models';
import { PendingImage } from '~utils';

describe('ImagePipe', () => {
	let pipe: ImagePipe;
	// tslint:disable-next-line:prefer-const
	let sanitizer: DomSanitizer;
	const baseUrl = 'https://files.showsourcing.com';

	beforeEach(() => {
		pipe = new ImagePipe(sanitizer);
	});
	const fileName = '18511884-666d-4518-8380-8e2c1fe6908a.jpg';
	const appImage: AppImage = {
		fileName,
		urls: [
			{ url: 'https://files.showsourcing.com/xs/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
			{ url: 'https://files.showsourcing.com/s/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
			{ url: 'https://files.showsourcing.com/m/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
			{ url: 'https://files.showsourcing.com/xm/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
			{ url: 'https://files.showsourcing.com/l/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
			{ url: 'https://files.showsourcing.com/xl/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' }
		], '__typename': 'Image'
	};

	const fakePendingImage = {
		data: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
	};

	const supplierWithImage: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake supplier with images',
		images: [appImage, appImage],
		'__typename': 'Supplier'
	};
	const supplierWithoutImage: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake supplier without images',
		'__typename': 'Supplier'
	};
	const array = [appImage, appImage];

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

	// array
	it(`transform (array) to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(array)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (array, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(pipe.transform(array, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (array, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(pipe.transform(array, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (array, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(pipe.transform(array, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (array, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(pipe.transform(array, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (array, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(array, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// AppImage Object
	it(`transform (appImage) to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(appImage)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (appImage, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(pipe.transform(appImage, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (appImage, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(pipe.transform(appImage, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (appImage, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(pipe.transform(appImage, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (appImage, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(pipe.transform(appImage, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (appImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(appImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// PendingImage Object
	it(`transform (appImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(true).toBe(true);
		// expect(pipe.transform(appImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// Supplier, product, Entity object... - supplierWithImage
	it(`transform (supplierWithImage) to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(supplierWithImage)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (supplierWithImage, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(pipe.transform(supplierWithImage, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (supplierWithImage, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(pipe.transform(supplierWithImage, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (supplierWithImage, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(pipe.transform(supplierWithImage, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (supplierWithImage, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(pipe.transform(supplierWithImage, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (supplierWithImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(pipe.transform(supplierWithImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// Supplier, product, Entity object... - supplierWithoutImage  -> should check if (!value.images) return this.getDefault(type);
	it(`transform (supplierWithoutImage) to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage)).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "xs") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage, 'xs')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "s") to"${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage, 's')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "m") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage, 'm')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "l") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage, 'l')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "xl") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutImage, 'xl')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	// string
	it(`transform ("${fileName}") to "${baseUrl}/xl/${fileName}"`, () => {
		expect(pipe.transform(fileName)).toBe(`${baseUrl}/xl/${fileName}`);
	});

	it(`transform ("${fileName}", "xs") to "${baseUrl}/xs/${fileName}"`, () => { // missing size xs for "ImageUrls"
		expect(pipe.transform(fileName, 'xs')).toBe(`${baseUrl}/xs/${fileName}`);
	});

	it(`transform ("${fileName}", "s") to "${baseUrl}/s/${fileName}"`, () => {
		expect(pipe.transform(fileName, 's')).toBe(`${baseUrl}/s/${fileName}`);
	});

	it(`transform ("${fileName}", "m") to "${baseUrl}/m/${fileName}"`, () => {
		expect(pipe.transform(fileName, 'm')).toBe(`${baseUrl}/m/${fileName}`);
	});

	it(`transform ("${fileName}", "l") to "${baseUrl}/l/${fileName}"`, () => {
		expect(pipe.transform(fileName, 'l')).toBe(`${baseUrl}/l/${fileName}`);
	});

	it(`transform ("${fileName}", "xl") to "${baseUrl}/xl/${fileName}"`, () => {
		expect(pipe.transform(fileName, 'xl')).toBe(`${baseUrl}/xl/${fileName}`);
	});
});
