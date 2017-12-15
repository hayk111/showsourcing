import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierListViewComponent } from './supplier-list-view.component';

describe('SupplierListViewComponent', () => {
	let component: SupplierListViewComponent;
	let fixture: ComponentFixture<SupplierListViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SupplierListViewComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SupplierListViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
