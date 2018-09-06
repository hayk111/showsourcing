import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, share, filter, skip } from 'rxjs/operators';

import { Filter, FilterType } from '~shared/filters/models/filter.class';
import { tap } from 'rxjs/internal/operators/tap';


export class FilterList {

	/** to know when filters are changing */
	private _valueChanges$ = new Subject<FilterList>();
	valueChanges$ = this._valueChanges$.asObservable();

	/** current filters sync */
	private _filters: Filter[] = [];
	private setFilters(filters: Filter[]) {
		this._filters = filters;
		this._byType = this.filtersToByType(filters);
		this._query = this.filtersToPredicate(filters);
		this._valueChanges$.next(this);
	}
	asFilters() { return this._filters; }

	/** Weird data structure of Map<filterType, Map<FilterValue, Filter>>
	 * Allows us to check in constant time if a filter type has a filter of value x.
	 *
	 * For example we can answer the question: Does this product has a filter on supplier
	 * with id = 10 ?
	 *
	 * byType.get(FilterType.SUPPLIER).has(10)
	 */
	private _byType: Map<FilterType, Map<any, Filter>>;
	asByType() { return this._byType; }

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	private _query: string;
	asPredicate(): string { return this._query; }

	constructor(startFilters: Filter[] = []) {
		// adding the start filters
		this.setFilters(startFilters);
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this.setFilters([...this._filters, added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this.setFilters(
			this._filters.filter(
				fltr => (fltr.type !== removed.type || fltr.value !== removed.value)
			)
		);
	}

	/** removes all filters */
	clearAll() {
		this.setFilters([]);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType | string) {
		this.setFilters(this._filters.filter(f => f.type !== type));

	}

	/** return a new map of <type, new Map()> */
	private getInitialMap() {
		const byTypeMap = new Map();
		Object.values(FilterType)
			.forEach(type => byTypeMap.set(type, new Map()));
		return byTypeMap;
	}

	/** returns a new map of <type, <filter.value, filter>> */
	private filtersToByType(filters: Filter[]) {
		const copy = this.getInitialMap();
		filters.forEach(fltr => copy.get(fltr.type).set(fltr.value, filter));
		return copy;
	}

	/** transform filter into a predicate understandable by graphql */
	private filtersToPredicate(filters: Filter[]): string {
		return FilterList.filtersToPredicate(filters);
	}

	static filtersToPredicate(filters: Filter[]) {
		if (filters.length === 0)
			return '';

		return filters.map(({ type, value }) => {

			return FilterList.getFieldCondition(type, value);
		}).join(' or ');
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private static getFieldCondition(type, value) {
		switch (type) {
			case FilterType.FAVORITE:
			case FilterType.ARCHIVED:
				return `${type} == ${value}`;
			// most of the filters from the panel filter by id
			default:
				return `${type}.id == "${value}"`;
		}
	}

}
