import { LogoPipe } from './logo.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_SUPPLIER_PROD_ICON
} from '~utils/constants';

import { TestBed } from '@angular/core/testing';
import { SuppliersModule } from '~features/supplier/supplier.module';
import { SupplierService } from '~core/entity-services/supplier/supplier.service';
import { Supplier } from '~core/models';



describe('LogoPipe', () => {
	// just keep things simple, no need for much logic in unit testing, we can hard code the data
	let pipe: LogoPipe;
	let supplierWithLogo: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e', 
		name: 'Fake supplier with logo', 
		logoImage: { 
			id: '18511884-666d-4518-8380-8e2c1fe6908a',
			fileName: '18511884-666d-4518-8380-8e2c1fe6908a.jpg',
			urls:[ 
				{ url: 'https://files.showsourcing.com/xs/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
				{ url: 'https://files.showsourcing.com/s/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
				{ url: 'https://files.showsourcing.com/m/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
				{ url: 'https://files.showsourcing.com/xm/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
				{ url: 'https://files.showsourcing.com/l/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' },
				{ url: 'https://files.showsourcing.com/xl/18511884-666d-4518-8380-8e2c1fe6908a.jpg', __typename: 'ImageUrl' }
			],'__typename':'Image'
		},
		'__typename':'Supplier'
	};

	let supplierWithoutLogo: Supplier = {
		id: '75b45384-0748-49c5-868d-24951abf757e', 
		name: 'Fake supplier without logo',
	};

	beforeEach(() => {
		pipe = new LogoPipe();

		TestBed.configureTestingModule({
			imports: [
				SuppliersModule
			]
		});
	});

	// no value input -> get default logo
	it(`transform (undefined, "supplier") to "${DEFAULT_SUPPLIER_ICON}"`, () => {
		expect(pipe.transform(undefined, 'supplier')).toBe('assets/icons/supplier.svg');
	});

	it(`transform (undefined, "user") to ${DEFAULT_USER_ICON}`, () => {
		expect(pipe.transform(undefined, 'user')).toBe('assets/icons/user.svg');
	});

	it(`transform (undefined, "event") to ${DEFAULT_EVENT_ICON}`, () => {
		expect(pipe.transform(undefined, 'event')).toBe('assets/icons/event.svg');
	});

	it(`transform (undefined, "project") to ${DEFAULT_PROJECT_ICON}`, () => {
		expect(pipe.transform(undefined, 'project')).toBe('assets/icons/project.svg');
	});

	it(`transform (undefined, "category") to ""`, () => {
		expect(pipe.transform(undefined, 'category')).toBeFalsy();
	});

	it(`transform (undefined, "supplierType") to ""`, () => {
		expect(pipe.transform(undefined, 'supplierType')).toBeFalsy();
	});

	it(`transform (undefined, "supplier-product") to ${DEFAULT_SUPPLIER_PROD_ICON}`, () => {
		expect(pipe.transform(undefined, 'supplier-product')).toBe('assets/icons/supplier-purple.svg');
	});

	// no value, no type
	it(`transform (undefined, undefined) to ""`, () => {
		expect(pipe.transform(undefined)).toBeFalsy();
	});

});
