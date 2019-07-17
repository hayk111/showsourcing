import { LogoPipe } from './logo.pipe';
import {
	DEFAULT_EVENT_ICON, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON,
	DEFAULT_IMG, DEFAULT_PROJECT_ICON, DEFAULT_SUPPLIER_PROD_ICON
} from '~utils/constants';

import { TestBed } from '@angular/core/testing';
import { SuppliersModule } from '~features/supplier/supplier.module';
import { SupplierService } from '~core/entity-services/supplier/supplier.service';

describe('LogoPipe', () => {
	let pipe: LogoPipe;
	let supplierSrv: SupplierService;
	beforeEach(() => {
		pipe = new LogoPipe();

		TestBed.configureTestingModule({
			imports: [
				SuppliersModule
			]
		});
		supplierSrv = TestBed.get(SupplierService);
		supplierSrv.selectOne('678ea8c9-99ff-45ec-a035-396796ea290e')
			.subscribe(
				res => {
					console.log('object', res);
				},
				err => console.log('err', err)
			);
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
