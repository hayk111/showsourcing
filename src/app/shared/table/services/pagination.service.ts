import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PaginationService {
		/** number of items taken at once */
		private currentLimit = 25;
		private _limit$ = new BehaviorSubject<number>(this.currentLimit);
		limit$ = this._limit$.asObservable();
		/** from which page */
		private currentPage = 0;
		private _page$ = new BehaviorSubject<number>(this.currentPage);
		page$ = this._page$.asObservable();


	goToPage(page: number) {
		this._page$.next(page);
	}

	goToNextPage() {
		this._page$.next(this.currentPage + 1);
	}

	goToPreviousPage() {
		this._page$.next(this.currentPage - 1);
	}

	goToFirstPage() {
		this._page$.next(0);
	}

	goToLastPage() {
		// TODO need total
		// const lastPage = Math.ceil(this.total / this.currentLimit) - 1;
		// this._page$.next(lastPage);
	}

}
