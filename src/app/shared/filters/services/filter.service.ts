import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { Filter, FilterType } from '../models';

@Injectable()
export class FilterService {
	/** All filters applied as an array */
	private _filters$ = new BehaviorSubject<Filter[]>([]);
	filters$: Observable<Filter[]> = this._filters$.asObservable();
	/** Weird data structure of Map<filterType, Map<FilterValue, Filter>>
	 * Allows us to check in constant time if a filter type has a filter of value x.
	 *
	 * For example we can answer the question: Does this product has a filter on supplier
	 * with id = 10 ?
	 *
	 * byType.get(FilterType.SUPPLIER).has(10)
	 */
	private _byType$ = new BehaviorSubject(new Map<FilterType, Map<any, Filter>>());
	byType$: Observable<Map<FilterType, Map<any, Filter>>> = this._byType$.asObservable();

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	query$: Observable<string> = this._filters$.asObservable().pipe(
		map(filters => this.filtersToQuery(filters))
	);

	constructor() {
		// adding a map for each type
		const byType = new Map();
		Object.keys(FilterType).forEach(type => byType.set(type, new Map()));
		this._byType$.next(byType);
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		// adding to array of filters
		this._filters$.pipe(
			first(),
			map(filters => ([...filters, added]))
		).subscribe(this._filters$);

		// adding to byType
		this._byType$.pipe(
			first(),
			map(byType => this.addFilterToByType(byType, added))
		).subscribe(this._byType$);

	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this._filters$.pipe(
			first(),
			map(filters => filters.filter(
				filter => filter.type !== removed.type && filter.value !== removed.type
			))
		).subscribe(this._filters$);

		// removing to byType
		this._byType$.pipe(
			first(),
			map(byType => this.removeFilterToByType(byType, removed))
		).subscribe(this._byType$);
	}

	/** removes all filters */
	clearAll() {
		this._filters$.next([]);
		this._byType$.next(new Map());
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType) {
		// removing to byType
		this._byType$.pipe(
			first(),
			map(byType => { byType.delete(type); return byType; })
		).subscribe(this._byType$);

		this._filters$.pipe(
			first(),
			map(filters => filters.filter(filter => filter.type !== type))
		).subscribe(this._filters$);
	}

	/** upsert filter, will delete previous filter with the same type */
	upsertFilter(inserted: Filter) {
		throw Error('not implemented yet');
	}


	private addFilterToByType(byType: Map<FilterType, Map<any, Filter>>, added: Filter) {
		byType.get(added.type).set(added.value, added);
		return byType;
	}

	private removeFilterToByType(byType: Map<FilterType, Map<any, Filter>>, removed: Filter) {
		byType.get(removed.type).delete(removed.value);
		return byType;
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
