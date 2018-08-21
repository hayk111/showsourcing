import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, filter } from 'rxjs/operators';

import { Filter, FilterType } from '~shared/filters/models';

@Injectable({
	providedIn: 'root'
})
export class FilterService {

	/** All filters applied as an array */
	private _filters$ = new BehaviorSubject<Filter[]>([]);
	filters$: Observable<Filter[]> = this._filters$.asObservable();
	private currentFilters: Filter[] = [];
	/** Weird data structure of Map<filterType, Map<FilterValue, Filter>>
	 * Allows us to check in constant time if a filter type has a filter of value x.
	 *
	 * For example we can answer the question: Does this product has a filter on supplier
	 * with id = 10 ?
	 *
	 * byType.get(FilterType.SUPPLIER).has(10)
	 */
	byType$: Observable<Map<FilterType, Map<any, Filter>>> = this._filters$.asObservable().pipe(
		map(filters => this.filtersToByType(filters)),
		share()
	);

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	query$: Observable<string> = this._filters$.asObservable().pipe(
		map(filters => this.filtersToQuery(filters)),
		share()
	);

	constructor() {
		this._filters$.subscribe(filters => this.currentFilters = filters);
	}

	/** adds an array of filters at the end of current filters */
	addFilters(added: Filter[]) {
		this._filters$.next([...this.currentFilters, ...added]);
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this._filters$.next([...this.currentFilters, added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this._filters$.next(this.currentFilters.filter(
			filter => (filter.type !== removed.type || filter.value !== removed.value)
		));
	}

	/** removes all filters */
	clearAll() {
		this._filters$.next([]);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType | string) {
		this._filters$.next(this.currentFilters.filter(f => f.type !== type));

	}

	/** upsert filter, will delete previous filter with the same type */
	upsertFilter(inserted: Filter) {
		const newFilters = this.currentFilters
			.filter(f => f.type !== inserted.type);
		newFilters.push(inserted);
		this._filters$.next(newFilters);
	}

	private getInitialMap() {
		const byTypeMap = new Map();
		Object.values(FilterType).forEach(type => byTypeMap.set(type, new Map()));
		return byTypeMap;
	}

	private filtersToByType(filters: Filter[]) {
		const copy = this.getInitialMap();
		filters.forEach(filter => copy.get(filter.type).set(filter.value, filter));
		return copy;
	}

	private filtersToQuery(filters: Filter[]): string {
		return FilterService.filtersToQuery(filters);
	}

	static filtersToQuery(filters: Filter[]) {
		if (filters.length === 0)
			return '';

		return filters.map(({ type, value, raw, comparator }) => {
			// if there is a comparator we use the comparator to make the query
			if (comparator)
				return `${type} ${comparator} ${value}`;
			// else we return the filter given the type
			return FilterService.getFieldCondition(type, value)
		}).join(' or ');
	}

	private static getFieldCondition(type, value) {
		switch (type) {
			case FilterType.SEARCH:
				return `name CONTAINS[c] "${value}"`;
			case FilterType.FAVORITE:
			case FilterType.ARCHIVED:
				return `${type} == ${value}`;

			case FilterType.ID:
				return `${type} == "${value}"`;
			default:
				return `${type}.id == "${value}"`;
		}
	}

	filtersNumber() {
		return this.currentFilters.filter(
			filter => (filter.type === FilterType.PROJECT ||
				filter.type === FilterType.SUPPLIER ||
				filter.type === FilterType.EVENT ||
				filter.type === FilterType.CATEGORY ||
				filter.type === FilterType.TAG ||
				filter.type === FilterType.CREATED_BY ||
				filter.type === FilterType.PRODUCT_STATUS_TYPE ||
				filter.type === FilterType.FAVORITE ||
				filter.type === FilterType.ARCHIVED)
		).length;
	}
}
