import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '~shared/icons';
import { PaginationComponent } from './pagination.component';
import { Component, ViewChild } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/erm/services/_global/select-params';

const ITEMS_PER_PAGE = DEFAULT_TAKE_PAGINATION;

/* In the host component's template we will pass the inputs to the actual
 * component. Else ngOnChanges is not triggered.
 * see: https://stackoverflow.com/questions/37408801/testing-ngonchanges-lifecycle-hook-in-angular-2
 */
@Component({
	selector: `test-host-component`,
	template:
		`<pagination-app
		[width]="width"
		[count]="count"
		[hasPageItemsCount]="hasPageItemsCount"
		[currentPage]="currentPage"><pagination-app>`
})
export class TestHostComponent {
	@ViewChild(PaginationComponent, { static: true }) component: any;
	width = 5;
	count = ITEMS_PER_PAGE * 20;
	rows = new Array();
	currentPage = 0;
	hasPageItemsCount = true;
}


describe('Component: PaginationComponent', () => {
	let testComp: TestHostComponent;
	let paginationComp: PaginationComponent;
	let fixture: ComponentFixture<TestHostComponent>;
	let previousBtn: HTMLButtonElement;
	let nextBtn: HTMLButtonElement;
	let currentPageElem: HTMLElement;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TestHostComponent, PaginationComponent, IconComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestHostComponent);
		testComp = fixture.componentInstance;
		paginationComp = testComp.component;
		testComp.width = 5;
		fixture.detectChanges();
		previousBtn = fixture.nativeElement.querySelector('icon-app[name="angle-left"]');
		nextBtn = fixture.nativeElement.querySelector('icon-app[name="angle-right"]');
		currentPageElem = fixture.nativeElement.querySelector('.selected');
	});

	it('should display current page + 1 as the selected page', () => {
		fixture.detectChanges();
		expect(currentPageElem.textContent).toContain('1');
	});

	it('previous button should be disabled when on page 0', () => {
		expect(paginationComp.currentPage).toEqual(0);
		expect(previousBtn.className).toContain('disabled');
	});

	it('next button should be disabled when on last page', () => {
		testComp.count = ITEMS_PER_PAGE * 20;
		testComp.currentPage = 19;
		fixture.detectChanges();
		expect(nextBtn.className).toContain('disabled');
	});

	it('clicking on next icon should go to next page', () => {
		spyOn(paginationComp.goToPage, 'emit');
		const currPage = paginationComp.currentPage;
		nextBtn.click();
		expect(paginationComp.currentPage).toEqual(currPage + 1);
		expect(paginationComp.goToPage.emit).toHaveBeenCalledWith(paginationComp.currentPage);
	});

	it('clicking on previous icon should go to previous page', () => {
		spyOn(paginationComp.goToPage, 'emit');
		// starting on page 1 so button isn't disabled
		testComp.currentPage = 1;
		fixture.detectChanges();
		const currPage = paginationComp.currentPage;
		previousBtn.click();
		expect(paginationComp.currentPage).toEqual(currPage - 1);
		expect(paginationComp.goToPage.emit).toHaveBeenCalledWith(paginationComp.currentPage);
	});

	it('clicking on a index page button should go to index page', () => {
		spyOn(paginationComp.goToPage, 'emit');
		const indexBtns = fixture.nativeElement.querySelectorAll('.pagination-item');
		const fourthPage = indexBtns[4];
		testComp.currentPage = 1;
		fixture.detectChanges();
		fourthPage.click();
		expect(paginationComp.currentPage).toEqual(4);
		expect(paginationComp.goToPage.emit).toHaveBeenCalledWith(paginationComp.currentPage);
	});

	it('should have the correct number of total pages', () => {
		// 0 items
		testComp.count = 0;
		fixture.detectChanges();
		expect(paginationComp.totalPages).toEqual(1);
		// 1 page
		testComp.count = ITEMS_PER_PAGE;
		fixture.detectChanges();
		expect(paginationComp.totalPages).toEqual(1);
		// 20 pages
		testComp.count = ITEMS_PER_PAGE * 20;
		fixture.detectChanges();
		expect(paginationComp.totalPages).toEqual(20);
		// 21 pages (20 pages + 1 item)
		testComp.count = (ITEMS_PER_PAGE * 20) + 1;
		fixture.detectChanges();
		expect(paginationComp.totalPages).toEqual(21);
	});

	it('should display the correct range', () => {

		testComp.count = ITEMS_PER_PAGE * 7;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([0, 1, 2, 3, 4]);

		testComp.currentPage = 2;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([0, 1, 2, 3, 4]);

		testComp.currentPage = 4;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([2, 3, 4, 5, 6]);

		testComp.currentPage = 6;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([2, 3, 4, 5, 6]);

	});

	it('should display the range [0] when no items', () => {
		// when no items
		testComp.count = 0;
		testComp.currentPage = 0;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([0]);
	});

	it('should display the correct range when we have less pages than fits the width', () => {
		// when only two pages
		testComp.count = ITEMS_PER_PAGE * 2;
		testComp.currentPage = 0;
		fixture.detectChanges();
		expect(paginationComp.range).toEqual([0, 1]);
	});

	it('should display per page items count in the right corner when `hasPageItemsCount` is true and not otherwise', () => {
		let itemsPageCount = fixture.nativeElement.querySelector('.items-page-count');
		expect(itemsPageCount).toBeTruthy();

		testComp.hasPageItemsCount = false;
		fixture.detectChanges();
		itemsPageCount = fixture.nativeElement.querySelector('.items-page-count');
		expect(itemsPageCount).toBeFalsy();
	});

});
