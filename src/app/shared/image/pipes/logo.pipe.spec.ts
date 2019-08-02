import { LogoPipe } from './logo.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_SUPPLIER_PROD_ICON
} from '~utils/constants';

import { Supplier, Event, EventDescription } from '~core/models';

describe('LogoPipe', () => {
	let pipe: LogoPipe;
	const baseUrl = 'https://files.showsourcing.com';
	const urls = ['xs', 's', 'm', 'l', 'xl'].map(size => ({
		url: `https://files.showsourcing.com/${size}/18511884-666d-4518-8380-8e2c1fe6908a.jpg`,
		__typename: 'ImageUrl',
		id: '',
		maxHeight: 1,
		maxWidth: 1
	}));

	const logoImage = {
		id: '18511884-666d-4518-8380-8e2c1fe6908a',
		fileName: '18511884-666d-4518-8380-8e2c1fe6908a.jpg',
		urls, '__typename': 'Image'
	} as any;

	const supplierWithLogo: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake supplier with logo',
		logoImage,
		'__typename': 'Supplier'
	};

	const supplierWithoutLogo: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake supplier without logo',
	};

	const descriptionWithLogo: EventDescription = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Event description',
		description: 'description',
		global: true,
		supplierCount: 2,
		logoImage,
		'__typename': 'EventDescription'
	};

	const descriptionWithoutLogo: EventDescription = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Event description',
		description: 'description',
		global: true,
		supplierCount: 2,
		'__typename': 'EventDescription'
	};

	const eventWithDescription: Event = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake event with description',
		description: descriptionWithLogo
	};

	const eventWithoutDescription: Event = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake event without description'
	};

	const eventWithDesButWithoutLogo: Event = {
		id: '75b45384-0748-49c5-868d-24951abf757e',
		name: 'Fake event without description',
		description: descriptionWithoutLogo
	};

	beforeEach(() => {
		pipe = new LogoPipe();
	});

	// no value input -> get default logo
	it(`transform (undefined, "supplier") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(undefined, 'supplier')).toBe(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (undefined, "user") to "${DEFAULT_USER_ICON}"`, () => {
		expect(pipe.transform(undefined, 'user')).toBe(`${DEFAULT_USER_ICON}`);
	});

	it(`transform (undefined, "event") to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(undefined, 'event')).toBe(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (undefined, "project") to "${DEFAULT_PROJECT_ICON}"`, () => {
		expect(pipe.transform(undefined, 'project')).toBe(`${DEFAULT_PROJECT_ICON}`);
	});

	it(`transform (undefined, "category") to ""`, () => {
		expect(pipe.transform(undefined, 'category')).toBeFalsy();
	});

	it(`transform (undefined, "supplierType") to ""`, () => {
		expect(pipe.transform(undefined, 'supplierType')).toBeFalsy();
	});

	it(`transform (undefined, "supplier-product") to "${DEFAULT_SUPPLIER_PROD_ICON}"`, () => {
		expect(pipe.transform(undefined, 'supplier-product')).toBe(`${DEFAULT_SUPPLIER_PROD_ICON}`);
	});

	// no value, no type
	it(`transform (undefined, undefined) to ""`, () => {
		expect(pipe.transform(undefined)).toBeFalsy();
	});

	// supplier with logo
	it(`transform (supplierWithLogo, 'supplier', undefined) to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(supplierWithLogo, 'supplier', undefined)).toContain(`${baseUrl}/s/`);
	});

	it(`transform (supplierWithLogo, 'supplier', 's') to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(supplierWithLogo, 'supplier', 's')).toContain(`${baseUrl}/s/`);
	});

	it(`transform (supplierWithLogo, 'supplier', 'm') to ${baseUrl}/m/fileName`, () => {
		expect(pipe.transform(supplierWithLogo, 'supplier', 'm')).toContain(`${baseUrl}/m/`);
	});

	it(`transform (supplierWithLogo, 'supplier', 'l') to ${baseUrl}/l/fileName`, () => {
		expect(pipe.transform(supplierWithLogo, 'supplier', 'l')).toContain(`${baseUrl}/l/`);
	});

	it(`transform (supplierWithLogo, 'supplier', 'xl') to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(supplierWithLogo, 'supplier', 'xl')).toContain(`${baseUrl}/xl/`);
	});

	// supplier without logo
	it(`transform (supplierWithoutLogo, 'supplier', undefined) to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutLogo, 'supplier', undefined)).toContain(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutLogo, 'supplier', 's') to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutLogo, 'supplier', 's')).toContain(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutLogo, 'supplier', 'm') to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutLogo, 'supplier', 'm')).toContain(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutLogo, 'supplier', 'l') to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutLogo, 'supplier', 'l')).toContain(`${DEFAULT_SUPPLIER_ICON}`);
	});

	it(`transform (supplierWithoutLogo, 'supplier', 'xl') to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(supplierWithoutLogo, 'supplier', 'xl')).toContain(`${DEFAULT_SUPPLIER_ICON}`);
	});

	// event with description and logo
	it(`transform (eventWithDescription, 'event', undefined) to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(eventWithDescription, 'event', undefined)).toContain(`${baseUrl}/s/`);
	});

	it(`transform (eventWithDescription, 'event', 's') to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(eventWithDescription, 'event', 's')).toContain(`${baseUrl}/s/`);
	});

	it(`transform (eventWithDescription, 'event', 'm') to ${baseUrl}/m/fileName`, () => {
		expect(pipe.transform(eventWithDescription, 'event', 'm')).toContain(`${baseUrl}/m/`);
	});

	it(`transform (eventWithDescription, 'event', 'l') to ${baseUrl}/l/fileName`, () => {
		expect(pipe.transform(eventWithDescription, 'event', 'l')).toContain(`${baseUrl}/l/`);
	});

	it(`transform (eventWithDescription, 'event', 'xl') to ${baseUrl}/s/fileName`, () => {
		expect(pipe.transform(eventWithDescription, 'event', 'xl')).toContain(`${baseUrl}/xl/`);
	});

	// event with desciption but doesn't have logo
	it(`transform (eventWithDesButWithoutLogo, 'event', undefined) to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithDesButWithoutLogo, 'event', undefined)).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithDesButWithoutLogo, 'event', 's') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithDesButWithoutLogo, 'event', 's')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithDesButWithoutLogo, 'event', 'm') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithDesButWithoutLogo, 'event', 'm')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithDesButWithoutLogo, 'event', 'l') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithDesButWithoutLogo, 'event', 'l')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithDesButWithoutLogo, 'event', 'xl') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithDesButWithoutLogo, 'event', 'xl')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	// event without desciption but doesn't have logo
	it(`transform (eventWithoutDescription, 'event', undefined) to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithoutDescription, 'event', undefined)).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithoutDescription, 'event', 's') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithoutDescription, 'event', 's')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithoutDescription, 'event', 'm') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithoutDescription, 'event', 'm')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithoutDescription, 'event', 'l') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithoutDescription, 'event', 'l')).toContain(`${DEFAULT_EVENT_ICON}`);
	});

	it(`transform (eventWithoutDescription, 'event', 'xl') to "${DEFAULT_EVENT_ICON}"`, () => {
		expect(pipe.transform(eventWithoutDescription, 'event', 'xl')).toContain(`${DEFAULT_EVENT_ICON}`);
	});
});
