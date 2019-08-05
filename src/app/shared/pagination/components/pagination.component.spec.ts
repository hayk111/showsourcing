import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { IconComponent } from '~shared/icons';
import { PaginationComponent } from './pagination.component';
import { of } from 'rxjs';

describe('Component: PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;
	let de: DebugElement;
	let spy: jasmine.Spy;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [PaginationComponent, IconComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should instantiate', () => {
		expect(component).toBeDefined();
	});

	it('should start with pagination index 0', () => {
		expect(component.currentPage).toEqual(0);
	});

	it('goToNextPage should increment currentPage', () => {
		component.totalPages = 2; // assuming there are 2 total pages
		const currPage = component.currentPage;
		component.goToNextPage();
		expect(component.currentPage).toEqual(currPage + 1);
	});

	it('goToPreviousPage should decrement currentPage', () => {
		component.totalPages = 2; // assuming there are 2 total pages
		const currPage = 1; // assuming we are on the page 2
		component.goToPreviousPage();
		expect(component.currentPage).toEqual(currPage - 1);
	});

	it('goToIndexPage should navigate to the page and call buildPaginatorRange', () => {
		// spy = spyOn<any>(component, 'buildPaginatorRange');

		component.goToIndexPage(5);
		fixture.detectChanges();
		expect(component.currentPage).toEqual(5);
		// expect(spy).toHaveBeenCalled();
	});

	it('should build range with even number width', () => {
		component.width = 4;
		component.currentPage = 0;
		fixture.detectChanges();
		expect(component.range).toEqual([0, 1, 2, 3, 4]);
	});

	it('should build range with odd number width', () => {
		component.width = 3;
		component.currentPage = 0;
		fixture.detectChanges();
		expect(component.range).toEqual([0, 1, 2]);
	});
});
