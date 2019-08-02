import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/entity-services/_global/select-params';

@Component({
	selector: 'pagination-app',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {

	/** Different rows displayed */
	@Input() rows;
	/** items that we will see per page */
	@Input() itemsPerPage = DEFAULT_TAKE_PAGINATION;
	/** total number of items */
	@Input() count = 0;
	/** width of the pagination, ie if 5 we display [1, 2, 3, 4, 5]  or [16, 17, 18, 19, 20] if 3 we display [1, 2, 3 ] */
	@Input() width = 5;

	@Output() goToPage = new EventEmitter<number>();
	/** current index of the pagination (starts at 1) */
	@Input() currentPage = 1; // TODO might be clearer if this started at 0 instead.

	/** how many pages our pagination has */
	totalPages;
	/** the pages displayed */
	range: Array<number> = [];

	ngOnChanges() {
		this.totalPages = Math.ceil(this.count / this.itemsPerPage);
		this.buildPaginatorRange();
	}

	goToIndexPage(page, disabled?: boolean) {
		if (!disabled) {
			this.currentPage = page;
			this.buildPaginatorRange();
			// emitting index - 1 because our pages start at 1 while pagination stars at 0
			this.goToPage.emit(page - 1);
		}
	}

	goToPreviousPage() {
		if (this.currentPage > 0)
			this.goToIndexPage(this.currentPage - 1);
	}

	goToNextPage() {
		if (this.currentPage < this.totalPages)
			this.goToIndexPage( this.currentPage + 1);
	}

	goToFirstPage() {
		this.currentPage = 1;
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
	private getPagingRange(currentIndex, { min = 1, total = this.totalPages, width = this.width } = {}) {

		if (width > total)
			width = total;

		let start = currentIndex - Math.floor(width / 2);
		start = Math.max(start, min);
		start = Math.min(start, min + total - width);

		return Array.from({ length: width }, (el, i) => start + i);
	}

}
