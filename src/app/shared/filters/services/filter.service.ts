import { Injectable } from '@angular/core';
import { Filter, FilterGroup, FilterType } from '../models';
import { Observable, Subject } from 'rxjs';
import { filter } from 'async';


@Injectable()
export class FilterService {
	private filterGroup: FilterGroup = {
		filters: [],
		byType: new Map<FilterType, Map<any, Filter>>()
	};
	private _filterGroup$ = new Subject<FilterGroup>();
	filterGroup$ = this._filterGroup$.asObservable();

	private emit() {
		this._filterGroup$.next(this.filterGroup);
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this.filterGroup.filters.push(added);
		if (!this.filterGroup.byType.has(added.type)) {
			this.filterGroup.byType.set(added.type, new Map());
		}
		this.filterGroup.byType.get(added.type).set(added.value, added);
		this.emit();
	}

	/** removes all filters */
	clearGroup() {
		this.filterGroup = {
			filters: [],
			byType: new Map<FilterType, Map<any, Filter>>()
		};
		this.emit();
	}

	/** upsert filter, will delete previous filter with the same type */
	upsertFilter(inserted: Filter) {
		throw Error('not implemented yet');
	}

	/** remove all filters of a given type */
	removeFilterType(type: string) {
		throw Error('not implemented yet');
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		throw Error('not implemented yet');
	}

	getFiltersAsUrlParams(): Observable<string> {
		throw Error('not implemented yet');
	}
}
