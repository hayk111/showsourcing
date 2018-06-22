import { Injectable } from '@angular/core';
import { Filter, FilterGroup, FilterType } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {
	private filterGroup: FilterGroup = {
		filters: [],
		byType: new Map<FilterType, Map<any, Filter>>()
	};

	private _filterGroup$ = new BehaviorSubject<FilterGroup>(this.filterGroup);
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
	removeFilterType(type: FilterType) {
		this.filterGroup.byType.set(type, new Map());
		this.emit();
	}

	/** removes one filter */
	removeFilter(filter: Filter) {
		const ret = this.filterGroup.byType.get(filter.type).delete(filter.value);
		const index = this.filterGroup.filters.findIndex(existingFilter => (filter.value === existingFilter.value));
		if (index !== -1) {
			this.filterGroup.filters.splice(index, 1);
		}
		this.emit();
	}

	getFiltersAsQuery(): Observable<string> {
		throw Error('not implemented yet');
	}

	createQueryFromFilters(filtergroup) {
		return filtergroup ?
			filtergroup.filters.map(
				({ type, value }) => this.getFieldCondition(type, value)).join(' or ') : '';
	}

	private getFieldName(type) {
		if (type === 'tag') {
			return 'tags';
		}
		return type;
	}

	private getFieldCondition(type, value) {
		return (type !== 'favorite' && type !== 'archived') ?
			`${this.getFieldName(type)}.id == "${value}"` :
			`${this.getFieldName(type)} == ${value}`;
	}
}
