import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PaginationService {
	/** number of items taken at once */
	private currentLimit = 25;
	private _limit$ = new BehaviorSubject<number>(this.currentLimit);
	limit$ = this._limit$.asObservable();
	limitChoices = [25, 50, 100, 200];
	/** from which page */
	private currentPage = 0;
	private _page$ = new BehaviorSubject<number>(this.currentPage);
	page$ = this._page$.asObservable();
	/** the range of pages displayed, to display page buttons */
	private _range$ = new ReplaySubject<number[]>(1);
	range$ = this._range$.asObservable();
	/** width of the pagination, ie if 5 we display [1, 2, 3, 4, 5]  or [16, 17, 18, 19, 20], if 3 we display [1, 2, 3 ] */
	private width = 5;
	private _total$ = new BehaviorSubject(0);
	private total: number;
	private totalPages: number;

	constructor() {
		combineLatest(
			this._total$,
			this.limit$,
			this.page$
		).subscribe(([total, limit, page]) => {
			this.total = total;
			this.totalPages = this.getTotalPages(total, limit);
			const range = this.buildPagingRange(page);
			this._range$.next(range);
		});
	}

	setupTotal(total: number) {
		this._total$.next(total);
	}

	goToPage(page: number) {
		if (page !== this.currentPage)
			this._page$.next(page);
	}

	goToNextPage() {
		if (this.currentPage < this.total - 1)
			this._page$.next(this.currentPage + 1);
	}

	goToPreviousPage() {
		if (this.currentPage > 0)
			this._page$.next(this.currentPage - 1);
	}

	goToFirstPage() {
		if (this.currentPage > 0)
			this._page$.next(0);
	}

	goToLastPage() {
		if (this.currentPage !== this.total - 1) {
			const lastPage = Math.ceil(this.total / this.currentLimit) - 1;
			this._page$.next(lastPage);
		}
	}

	setLimit(limit: number) {
		this._limit$.next(limit);
	}

	private getTotalPages(count: number, itemsPerPage: number) {
		return Math.max(1, Math.ceil(count / itemsPerPage));
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
	private buildPagingRange(currentIndex, { min = 0, total = this.totalPages , width = this.width } = {}) {

		if (width > total)
			width = total;

		let start = currentIndex - Math.floor(width / 2);
		start = Math.max(start, min);
		start = Math.min(start, min + total - width);
		return Array.from({ length: width }, (el, i) => start + i);
	}

}
