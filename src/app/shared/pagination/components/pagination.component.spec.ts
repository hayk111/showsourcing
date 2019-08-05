import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '~shared/icons';
import { PaginationComponent } from './pagination.component';


const ITEMS_PER_PAGE = 30;

describe('Component: PaginationComponent', () => {
	let component: PaginationComponent;
	let fixture: ComponentFixture<PaginationComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [PaginationComponent, IconComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		component.itemsPerPage = ITEMS_PER_PAGE;

		fixture.detectChanges();
	});

	it('should instantiate', () => {
		expect(component).toBeDefined();
	});

	it('should have the correct number of total pages', () => {
		component.count = 0;
		fixture.detectChanges();
		expect(component.totalPages).toEqual(1);
		component.count = 20;
		fixture.detectChanges();
		expect(component.totalPages).toEqual(1);
		component.count = ITEMS_PER_PAGE * 20;
		fixture.detectChanges();
		expect(component.totalPages).toEqual(20);
		component.count = ITEMS_PER_PAGE * 20 + 1;
		fixture.detectChanges();
		expect(component.totalPages).toEqual(21);
	});

	it('should build build the correct range', () => {
		component.width = 5;
		component.count = ITEMS_PER_PAGE * 20;
		component.currentPage = 0;
		fixture.detectChanges();
		expect(component.range).toEqual([0, 1, 2, 4, 5]);
		component.currentPage = 10;
		fixture.detectChanges();
		expect(component.range).toEqual([8, 9, 10, 11, 12]);
		component.currentPage = 18;
		fixture.detectChanges();
		expect(component.range).toEqual([16, 17, 18, 19, 20]);
		component.currentPage = 18;
		fixture.detectChanges();
		expect(component.range).toEqual([16, 17, 18, 19, 20]);

		component.count = ITEMS_PER_PAGE * 2;
		component.currentPage = 0;
		fixture.detectChanges();
		expect(component.range).toEqual([0, 1]);
	});


	it('goToNextPage should increment currentPage', () => {
		const currPage = component.currentPage;
		component.goToNextPage();
		expect(component.currentPage).toEqual(currPage + 1);
	});

	it('goToPreviousPage should decrement currentPage', () => {
		const currPage = component.currentPage;
		component.goToPreviousPage();
		expect(component.currentPage).toEqual(currPage - 1);
	});

	it('goToIndexPage should navigate to the page and call buildPaginatorRange', () => {
		component.goToIndexPage(5);
		fixture.detectChanges();
		expect(component.currentPage).toEqual(5);
	});


});
