import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_TAKE_PAGINATION } from '~core/erm';

@Injectable({
	providedIn: 'root'
})
export class PaginationService {
	private _perPageItemsCount$: BehaviorSubject<number> = new BehaviorSubject(DEFAULT_TAKE_PAGINATION);
	perPageItemsCount$ = this._perPageItemsCount$.asObservable();

	setPerPageItems(count: number) {
		this._perPageItemsCount$.next(count);
	}
}
