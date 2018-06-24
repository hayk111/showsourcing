import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { first, map, tap, take, share } from 'rxjs/operators';

import { Filter, FilterType } from '../models';

@Injectable()
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
	initialbyType: Map<FilterType, Map<any, Filter>> = new Map();

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	query$: Observable<string> = this._filters$.asObservable().pipe(
		map(filters => this.filtersToQuery(filters)),
		share()
	);

	constructor() {
		// adding a map for each type
		Object.values(FilterType).forEach(type => this.initialbyType.set(type, new Map()));
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this._filters$.next([...this.currentFilters, added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this._filters$.next(this.currentFilters.filter(
			filter => filter.type !== removed.type && filter.value !== removed.type
		));
	}

	/** removes all filters */
	clearAll() {
		this._filters$.next([]);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType) {
		this._filters$.next(this.currentFilters.filter(f => f.type !== type));

	}

	/** upsert filter, will delete previous filter with the same type */
	upsertFilter(inserted: Filter) {
		throw Error('not implemented yet');
	}


	private filtersToByType(filters: Filter[]) {
		const copy = new Map(this.initialbyType);
		filters.forEach(filter => copy.get(filter.type).set(filter.value, filter));
		return copy;
	}

	private filtersToQuery(filters: Filter[]) {
		return filters.length > 0 ? filters.map(
			({ type, value }) => this.getFieldCondition(type, value)).join(' or ') : '';
	}

	private getFieldCondition(type, value) {
		return (type !== 'favorite' && type !== 'archived') ?
			`${type}.id == "${value}"` :
			`${type} == ${value}`;
	}
}
