import { ImagePipe } from './image.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_REQUEST_ICON,
	DEFAULT_CATEGORY_ICON, DEFAULT_PRODUCT_ICON, DEFAULT_PRODUCT_LIST_ICON
} from '~utils/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { Supplier, AppImage } from '~core/models';
import { PendingImage } from '~utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({ template: `` })
class TestComponent {
	public pipe: ImagePipe;
	constructor(private sanitizer: DomSanitizer) {
		this.pipe = new ImagePipe(this.sanitizer);
	}
}

describe('ImagePipe', () => {
	const baseUrl = 'https://files.showsourcing.com';
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [ImagePipe, TestComponent] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
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

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});
	// no value input, no size, has type -> get default logo of type
	it(`transforms (undefined, undefined,"category") to "${DEFAULT_CATEGORY_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'category')).toBe('assets/icons/category.svg');
	});

	it(`transforms (undefined, undefined, "event") to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transforms (undefined, undefined, "product") to "${DEFAULT_PRODUCT_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'product')).toBe('assets/icons/product.svg');
	});

	it(`transforms (undefined, undefined, "product-list") to "${DEFAULT_PRODUCT_LIST_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'product-list')).toBe('assets/icons/product-list.svg');
	});

	it(`transforms (undefined, undefined, "project") to "${DEFAULT_PROJECT_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'project')).toBe('assets/icons/project.svg');
	});

	it(`transforms (undefined, undefined, "request") to "${DEFAULT_REQUEST_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'request')).toBe('assets/icons/request-list.svg');
	});

	it(`transforms (undefined, undefined, "event") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transforms (undefined, undefined, "user") to "${DEFAULT_USER_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'user')).toBe('assets/icons/user.svg');
	});

	// no value input, size, type -> get default logo of type
	it(`transforms (undefined, undefined, undefined) to "${DEFAULT_IMG}"`, () => {
		expect(component.pipe.transform(undefined, undefined, undefined)).toBe('assets/icons/image.svg');
	});

	// no value input, has size and type
	it(`transforms (undefined, 'xs',"category") to "${DEFAULT_CATEGORY_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'category')).toBe('assets/icons/category.svg');
	});

	it(`transforms (undefined, 'xl', "event") to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(component.pipe.transform(undefined, undefined, 'event')).toBe('assets/icons/event.svg');
	});

	// array
	it(`transform (array) to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(array)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (array, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(component.pipe.transform(array, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (array, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(component.pipe.transform(array, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (array, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(component.pipe.transform(array, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (array, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(component.pipe.transform(array, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (array, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(array, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// AppImage Object
	it(`transform (appImage) to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(appImage)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (appImage, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(component.pipe.transform(appImage, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (appImage, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(component.pipe.transform(appImage, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (appImage, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(component.pipe.transform(appImage, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (appImage, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(component.pipe.transform(appImage, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (appImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(appImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// PendingImage Object
	it(`transform (appImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(appImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// Supplier, product, Entity object... - supplierWithImage
	it(`transform (supplierWithImage) to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage)).toContain(`${baseUrl}/xl`);
	});

	it(`transform (supplierWithImage, "xs") to "${baseUrl}/xs/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage, 'xs')).toContain(`${baseUrl}/xs`);
	});

	it(`transform (supplierWithImage, "s") to "${baseUrl}/s/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage, 's')).toContain(`${baseUrl}/s`);
	});

	it(`transform (supplierWithImage, "m") to "${baseUrl}/m/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage, 'm')).toContain(`${baseUrl}/m`);
	});

	it(`transform (supplierWithImage, "l") to "${baseUrl}/l/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage, 'l')).toContain(`${baseUrl}/l`);
	});

	it(`transform (supplierWithImage, "xl") to "${baseUrl}/xl/fileName"`, () => {
		expect(component.pipe.transform(supplierWithImage, 'xl')).toContain(`${baseUrl}/xl`);
	});

	// Supplier, product, Entity object... - supplierWithoutImage  -> should check if (!value.images) return this.getDefault(type);
	it(`transform (supplierWithoutImage) to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage)).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "xs") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage, 'xs')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "s") to"${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage, 's')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "m") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage, 'm')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "l") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage, 'l')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutImage, "xl") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(component.pipe.transform(supplierWithoutImage, 'xl')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	// string
	it(`transform ("${fileName}") to "${baseUrl}/xl/${fileName}"`, () => {
		expect(component.pipe.transform(fileName)).toBe(`${baseUrl}/xl/${fileName}`);
	});

	it(`transform ("${fileName}", "xs") to "${baseUrl}/xs/${fileName}"`, () => { // missing size xs for "ImageUrls"
		expect(component.pipe.transform(fileName, 'xs')).toBe(`${baseUrl}/xs/${fileName}`);
	});

	it(`transform ("${fileName}", "s") to "${baseUrl}/s/${fileName}"`, () => {
		expect(component.pipe.transform(fileName, 's')).toBe(`${baseUrl}/s/${fileName}`);
	});

	it(`transform ("${fileName}", "m") to "${baseUrl}/m/${fileName}"`, () => {
		expect(component.pipe.transform(fileName, 'm')).toBe(`${baseUrl}/m/${fileName}`);
	});

	it(`transform ("${fileName}", "l") to "${baseUrl}/l/${fileName}"`, () => {
		expect(component.pipe.transform(fileName, 'l')).toBe(`${baseUrl}/l/${fileName}`);
	});

	it(`transform ("${fileName}", "xl") to "${baseUrl}/xl/${fileName}"`, () => {
		expect(component.pipe.transform(fileName, 'xl')).toBe(`${baseUrl}/xl/${fileName}`);
	});
});
