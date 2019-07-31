import {TestBed, ComponentFixture} from '@angular/core/testing';
import { IconComponent } from '~shared/icons';

import { PaginationComponent } from './pagination.component';

describe('Component: PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PaginationComponent, IconComponent],
			imports: []
		}).compileComponents();
	});

	it('should instantiate', () => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;

		expect(component).toBeDefined();
	});

	it('should start with pagination index 0', () => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;

		expect(component.indexPagination).toEqual(0);
	});

	it('should start with default section count 1', () => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;

		expect(component.totalSections).toEqual(1);
	});
});
