import { Injectable } from '@angular/core';
import { Sort } from '../models/sort.interface';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SortService {
	private currentSort: Sort;
	private _sort$ = new BehaviorSubject(undefined);
	sort$ = this._sort$.asObservable();

	toggleSort(field: string) {
		debugger;
		if (!this.currentSort) {
			this.currentSort = { field, direction: 'DESC' };
		} else {
			const newDirection = this.currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
			this.currentSort = { field, direction: newDirection };
		}
		this._sort$.next(this.currentSort);
	}

	isSorted(field: string) {
		if (!this.currentSort)
			return false;
		else
			return this.currentSort.field === field;
	}
}
