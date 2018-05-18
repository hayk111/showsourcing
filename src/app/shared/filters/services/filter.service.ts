import { Injectable } from '@angular/core';
import { Filter, FilterGroupName, FilterGroup, FilterType } from '../models';
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
	addFilter(filter: Filter) {
		this.filterGroup.filters.push(filter);
		if (!this.filterGroup.byType.has(filter.type)) {
			this.filterGroup.byType.set(filter.type, new Map());
		}
		this.filterGroup.byType.get(filter.type).set(filter.value, filter);
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
	upsertFilter(filter: Filter) {
		throw Error('not implemented yet');
	}

	/** remove all filters of a given type */
	removeFilterType(type: string) {
		throw Error('not implemented yet');
	}

	/** removes one filter */
	removeFilter(filter: Filter) {
		throw Error('not implemented yet');
	}

	getFiltersAsUrlParams(): Observable<string> {
		throw Error('not implemented yet');
	}
}