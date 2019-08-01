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

	/** how many pages our pagination has */
	totalPages;
	/** the pages displayed */
	range: Array<number> = [];
	/** current index of the pagination (starts at 1) */
	currentIndex = 1; // TODO might be clearer if this started at 0 instead.

	ngOnChanges() {
		this.totalPages = Math.ceil(this.count / this.itemsPerPage);
		this.buildPaginatorRange();
	}

	goToIndexPage(index, disabled?: boolean) {
		if (!disabled) {
			this.currentIndex = index;
			this.buildPaginatorRange();
			// emitting index - 1 because our pages start at 1 while pagination stars at 0
			this.goToPage.emit(index - 1);
		}
	}

	goToPreviousPage() {
		if (this.currentIndex > 0)
			this.goToIndexPage(this.currentIndex - 1);
	}

	goToNextPage() {
		if (this.currentIndex < this.totalPages)
			this.goToIndexPage( this.currentIndex + 1);
	}

	goToFirstPage() {
		this.currentIndex = 1;
	}

	private buildPaginatorRange() {
		this.range = this.getPagingRange(this.currentIndex, 1, this.totalPages, this.width);
	}

	/**
	 *
	 * @param currentIndex current index we are at
	 * @param min the last page on the left (usually 0 or 1)
	 * @param total total number of pages
	 * @param width length of the cursor
	 *
	 * Examples:
	 * console.log(getPagingRange(20)); // [16, 17, 18, 19, 20]
	 * console.log(getPagingRange(3, { total: 4, width: 3 })); // [2, 3, 4]
	 * console.log(getPagingRange(3, { min: 0, total: 4, width: 3 })); // [1, 2, 3]
	 */
	private getPagingRange(currentIndex, min, total, width) {

		if (width > total)
			width = total;

		let start = currentIndex - Math.floor(width / 2);
		start = Math.max(start, min);
		start = Math.min(start, min + total - width);

		return Array.from({ length: width }, (el, i) => start + i);
	}

}
