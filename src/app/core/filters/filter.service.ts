import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '~core/auth';
import { FilterType } from './filter-type.enum';
import { Filter } from './filter.class';
import { FilterConverter } from './_filter-converter.class';
import { ValuesByType, FiltersByType } from './filter-by.type';
import { distinct, distinctUntilChanged } from 'rxjs/operators';

/**
 * This class basically contains a Array<Filter> and then the same array of filters under different data structure.
 * filter by type, filterValue by type, and the queryArg which is the filter version that can be used by an api.
 *
 * The function set filter builds all those data types everytime it's called with an array of filters.
 * A converter helper class has the conversion mechanism.
 *
 * 4 main data strctures:
 * - filters: an array of filters to display all filters
 * - valuesByType  Map<FilterType, Set<any>>; where any is the filter values,
 *   to know easily if a filter value has already been added (for example when displaying check boxes next to all filter options
 * - filtersByType = Map<FilterType, Filter[]>; to display all filters under a specific filterType (in the main filter panel)
 * - queryArg: any which gives you the filter query arg that can be used with the API
 */
@Injectable({ providedIn: 'root' })
export class FilterService {
	/** helper */
	private converter: FilterConverter = new FilterConverter();
	/** to know when filters are changing, using replay subject here because in the constructor we set the starting ones */
	private _valueChanges$ = new BehaviorSubject<any>(this);
	valueChanges$ = this._valueChanges$.asObservable().pipe(
		distinctUntilChanged((x, y) => {
			return JSON.stringify(x) === JSON.stringify(y);
		})
	);
	/** default state */
	startFilters: Filter[] = [{ type: FilterType.DELETED, value: false }];
	/** the filters currently in the filter-list */
	filters: Filter[] = [];
	/** so we can check if a filter type has a specific value, filterList.valuesByType.has(id-10) */
	private valuesByType: ValuesByType = new Map();
	/** so we can display the filters for a given type */
	private filtersByType: FiltersByType = new Map();
	/** filter as a param form that can be used in a query */
	queryArg: any = {};
	/** keep accessible for helpers */
	searchedFields: string[] = [];

	/** if we want something else than the defaults */
	setup(startFilters: Filter[] = [], searchedFields?: string[]) {
		// adding the start filters
		this.startFilters = startFilters.length ? startFilters : this.startFilters;
		this.filters = this.startFilters;
		this.converter = new FilterConverter(searchedFields);
		this.setFilters(this.startFilters);
		this.searchedFields = searchedFields;
	}

	/** function that sets the filter of the filter list, also construct the different util object (by type, filter param) */
	setFilters(filters: Filter[]) {
		this.filters = filters;
		this.valuesByType = this.converter.valuesByType(this.filters);
		this.filtersByType = this.converter.filtersByType(this.filters);
		this.queryArg = this.converter.filtersToQueryArg(this.filters);
		this._valueChanges$.next(this.queryArg);
	}

	/** adds a search to the predicate and restart setFilters */
	search(value: string) {
		if (!value) {
			return this.removeFilterType(FilterType.SEARCH);
		}
		const lastFilter = this.getFiltersForType(FilterType.SEARCH)[0];

		if (!lastFilter) {
			this.addFilter({ type: FilterType.SEARCH, value });
		} else {
			lastFilter.value = value;
			this.setFilters(this.filters);
		}
	}

	/** adds one filter */
	addFilter(added: Filter) {
		this.setFilters([...this.filters, added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		this.setFilters(
			this.filters.filter(fltr => fltr.type !== removed.type || fltr.value !== removed.value)
		);
	}

	/** removes all filters except the ones we started with */
	reset() {
		this.setFilters(this.startFilters);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType) {
		this.setFilters(this.filters.filter(f => f.type !== type));
	}

	/** check if we have any filter for a given FilterType */
	hasFilterType(type: FilterType) {
		return (this.valuesByType.get(type) || new Set()).size > 0;
	}

	hasFilterValue(type: FilterType, value: any) {
		return (this.valuesByType.get(type) || new Set()).has(value);
	}

	getFiltersForType(type: FilterType): Filter[] {
		return this.filtersByType.get(type) || [];
	}

	getValuesForType(type: FilterType): Set<any> {
		return this.valuesByType.get(type) || new Set();
	}

	/** returns the number of added filter above the start filters */
	getFilterAmount() {
		return this.filters.filter(
			fil =>
				!this.startFilters.some(
					startFil => startFil.type === fil.type && startFil.value === fil.value
				)
		).length;
	}

	filterByProp(type: FilterType, value: boolean) {
		if (value) {
			const filterParam = { type, value };
			this.addFilter(filterParam);
		} else {
			this.removeFilterType(type);
		}
	}
}
