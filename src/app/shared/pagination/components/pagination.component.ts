import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/entity-services/_global/select-params';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'pagination-app',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent extends TrackingComponent implements OnChanges {

	/** items that we will see per page */
	@Input() itemsPerPage = DEFAULT_TAKE_PAGINATION;
	/** total number of items */
	@Input() count = 0;
	/** width of the pagination, ie if 5 we display [1, 2, 3, 4, 5]  or [16, 17, 18, 19, 20] if 3 we display [1, 2, 3 ] */
	@Input() set width(value: number) {
		if (value % 2 === 0)
			throw Error(`Width must be an odd number, received ${value}`);
		this._width = value;
	}
	get width() { return this._width; }
	private _width = 5;

	/** current index of the pagination (starts at 1) */
	@Input() currentPage = 0;
	@Output() goToPage = new EventEmitter<number>();

	/** how many pages our pagination has */
	totalPages;
	/** the pages displayed */
	range: Array<number> = [];

	ngOnChanges() {
		this.totalPages = this.getTotalPages(this.count, this.itemsPerPage);
		this.buildPaginatorRange();
	}

	goToIndexPage(page, disabled?: boolean) {
		if (!disabled) {
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
		this.currentPage = 1;
	}

	getTotalPages(count: number, itemsPerPage: number) {
		return Math.max(1, Math.ceil(count / itemsPerPage));
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
