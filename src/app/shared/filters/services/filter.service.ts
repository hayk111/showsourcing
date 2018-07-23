import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { toStore } from '~utils/store/store';

import { Filter, FilterType } from '~shared/filters/models';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	/** All filters applied as an array */
	private _filters$ = new BehaviorSubject<Filter[]>([]);
	filters$: Observable<Filter[]> = this._filters$.asObservable().pipe(
		toStore(this.storeKey)
	);
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
		toStore(this.storeKey + '/byType'),
		share()
	);

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	query$: Observable<string> = this._filters$.asObservable().pipe(
		map(filters => this.filtersToQuery(filters)),
		toStore(this.storeKey + '/query'),
		share()
	);

	/** this is the start when the view is displayed. It will allow us to
 *  not query items that are created after the view is displayed.
 */
	private startTime = new Date();

	constructor(@Inject('storeKey') private storeKey: string) {
		this._filters$.subscribe(filters => this.currentFilters = filters);
	}

	/** prevent update when another user create a new item
	 * the start time will be used and we won't query items created after this start time.
	 */
	preventCreationUpdate() {
		this.addFilter({ type: FilterType.PREVENT_UPDATE, value: true });
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
	removeFilterType(type: FilterType) {
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

	private filtersToQuery(filters: Filter[]) {
		return filters.length > 0 ? filters.map(
			({ type, value }) => this.getFieldCondition(type, value)).join(' or ') : '';
	}

	private getFieldCondition(type, value) {
		switch (type) {
			case FilterType.SEARCH:
				return `name CONTAINS "${value}"`;
			case FilterType.FAVORITE:
			case FilterType.ARCHIVED:
			case FilterType.ID:
				return `${type} == ${value}`;
			case FilterType.PREVENT_UPDATE:
				return `creationDate > "${this.startTime.toISOString()}"`;
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
