import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sort } from '../models/sort.interface';


@Injectable({ providedIn: 'root' })
export class SortService {
	private currentSort: Sort = {direction: 'DESC', property: 'createdAt'};
	private _sort$ = new BehaviorSubject<Sort>(this.currentSort);
	sort$ = this._sort$.asObservable();

	constructor() {
		this._sort$.next(this.currentSort);
	}

	toggleSort(property: string) {
		if (!this.currentSort || this.currentSort.property !== property) {
			this.currentSort = { property, direction: 'ASC' };
		} else {
			const newDirection = this.currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
			this.currentSort = { property, direction: newDirection };
		}
		this._sort$.next(this.currentSort);
	}

	isSorted(property: string) {
		if (!this.currentSort)
			return false;
		else
			return this.currentSort.property === property;
	}
}
