import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, TemplateRef } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/erm';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'pagination-app',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.side-padding-l]': 'hasSidePadding',
		'[class.mg-top-ms]': 'range?.length > 1 && hasTopPadding' // adding margin top only if the element is being shown up
	}
})
export class PaginationComponent extends TrackingComponent implements OnChanges {

	/** items that we will see per page */
	@Input() itemsPerPage = DEFAULT_TAKE_PAGINATION;
	/** total number of items */
	@Input() total = 0;
	/** whether we should show per page items count */
	@Input() hasPageItemsCount = true;
	/** whether the element has left and right padding of 24px */
	@Input() hasSidePadding = false;
	@Input() hasTopPadding = true;
	/** width of the pagination, ie if 5 we display [1, 2, 3, 4, 5]  or [16, 17, 18, 19, 20], if 3 we display [1, 2, 3 ] */
	@Input() set width(value: number) {
		if (value % 2 === 0)
			throw Error(`Width must be an odd number, received ${value}`);
		this._width = value;
	}
	@Input() footerTemplate: TemplateRef<any>;
	get width() { return this._width; }
	private _width = 5;

	/** current index of the pagination (starts at 1) */
	private _currentPage: number;
	@Input() set currentPage(value: number) { this._currentPage = value || 0; }
	get currentPage() { return this._currentPage; }
	@Output() goToPage = new EventEmitter<number>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	/** how many pages our pagination has */
	totalPages;
	/** the pages displayed */
	range: Array<number> = [];
	pageItemsCount = [25, 50, 100, 200];

	ngOnChanges() {
		this.totalPages = this.getTotalPages(this.total, this.itemsPerPage);
		this.buildPaginatorRange();
	}

	onChangePerPageCount(count) {
		this.goToIndexPage(0);
		this.showItemsPerPage.emit(count);
		this.itemsPerPage = count;

		this.totalPages = this.getTotalPages(this.total, this.itemsPerPage);
		this.buildPaginatorRange();
	}

	goToIndexPage(page: number) {
		if (page !== this.currentPage) {
			this.currentPage = page;
			this.buildPaginatorRange();
			this.goToPage.emit(page);
		}
	}

	goToPreviousPage() {
		if (this.currentPage > 0)
			this.goToIndexPage(this.currentPage - 1);
	}

	goToNextPage() {
		if (this.currentPage < this.totalPages - 1)
			this.goToIndexPage(this.currentPage + 1);
	}

	goToFirstPage() {
		if (this.currentPage > 0)
			this.goToIndexPage(0);
	}

	goToLastPage() {
		if (this.currentPage !== this.totalPages - 1)
			this.goToIndexPage(this.totalPages - 1);
	}

	getTotalPages(count: number, itemsPerPage: number) {
		return Math.max(1, Math.ceil(count / itemsPerPage));
	}

	getPerPageItemsCount() {
		const perPageItems = Number(this.itemsPerPage);
		const fromNumber = this.currentPage * perPageItems;
		const toNumber = fromNumber + perPageItems < this.total
			? fromNumber + perPageItems
			: this.total;

		return { fromNumber: fromNumber || 0, toNumber: toNumber || 0, count: this.total || 0 };
	}

	private buildPaginatorRange() {
		this.range = this.getPagingRange(this.currentPage);
	}

	/**
	 *
	 * @param currentIndex current index we are at
	 * @param min the last page on the left (usually 0 or 1)
	 * @param total total number of pages
	 * @param width length of the cursor
	 *
	 * Examples:
	 * console.log(getPagingRange(20, { min: 1, total: 20, width: 5 })); // [16, 17, 18, 19, 20]
	 * console.log(getPagingRange(15, { min: 1, total: 20, width: 5 })); // [13, 14, 15, 16, 17]
	 * console.log(getPagingRange(3, { min: 1, total: 4, width: 3})); // [2, 3, 4]
	 * console.log(getPagingRange(2, { min: 1, total: 4, width: 3})); // [1, 2, 3]
	 */
	private getPagingRange(currentIndex, { min = 0, total = this.totalPages, width = this._width } = {}) {

		if (width > total)
			width = total;

		let start = currentIndex - Math.floor(width / 2);
		start = Math.max(start, min);
		start = Math.min(start, min + total - width);
		return Array.from({ length: width }, (el, i) => start + i);
	}

}
