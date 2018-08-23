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
		this._query = this.filtersToQuery(filters);
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
	asByType() { return this._byType }

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	private _query: string;
	asQuery(): string { return this._query; }

	constructor(startFilters: Filter[] = []) {
		// adding the start filters
		this.setFilters(startFilters);
	}

	/** adds an array of filters at the end of current filters */
	addFilters(added: Filter[]) {
		this.setFilters([...this._filters, ...added]);
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this.setFilters([...this._filters, added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this.setFilters(this._filters.filter(
			filter => (filter.type !== removed.type || filter.value !== removed.value)
		));
	}

	/** removes all filters */
	clearAll() {
		this.setFilters([]);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType | string) {
		this.setFilters(this._filters.filter(f => f.type !== type));

	}

	/** upsert filter, will delete previous filter with the same type */
	upsertFilter(inserted: Filter) {
		const newFilters = this._filters
			.filter(f => f.type !== inserted.type);
		newFilters.push(inserted);
		this.setFilters(newFilters);
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
		return FilterList.filtersToQuery(filters);
	}

	static filtersToQuery(filters: Filter[]) {
		if (filters.length === 0)
			return '';

		return filters.map(({ type, value, raw, comparator }) => {
			// if there is a comparator we use the comparator to make the query
			if (comparator)
				return `${type} ${comparator} ${value}`;
			// else we return the filter given the type
			return FilterList.getFieldCondition(type, value)
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

	// for view products
	static fromString() {
		throw Error('not implemented yet');
	}

}
