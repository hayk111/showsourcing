import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from '~core/auth';
import { FilterType } from './filter-type.enum';
import { Filter } from './filter.class';
import { FilterConverter } from './_filter-converter.class';
import { ValuesByType, FiltersByType } from './filter-by.type';
import { distinct, distinctUntilChanged } from 'rxjs/operators';
import { bridgeFiltersConfig } from './bridge-filter.config';
import { api, Typename } from 'showsourcing-api-lib';

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
	startFilters: Filter[] = [];
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
	addFilter(added: Filter, typenameFiltered?: Typename, currentFilterType?: FilterType) {
		let newFilters = [...this.filters, added];

		newFilters = this._addBridgeFilters(newFilters, typenameFiltered, currentFilterType);

		this.setFilters(newFilters);
	}

	/** removes one filter */
	removeFilter(removed: Filter, typenameFiltered?: Typename, currentFilterType?: FilterType) {
		let newFilters = this.filters.filter(
			fltr => fltr.type !== removed.type || fltr.value !== removed.value
		);

		newFilters = this._addBridgeFilters(newFilters, typenameFiltered, currentFilterType);

		this.setFilters(newFilters);
	}

	/** removes all filters except the ones we started with */
	reset() {
		this.setFilters(this.startFilters);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType, typenameFiltered?: Typename) {
		let newFilters = this.filters.filter(f => f.type !== type);
		newFilters = this._addBridgeFilters(newFilters, typenameFiltered, type);
		this.setFilters(newFilters);
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
			fil => {
			return	!this.startFilters.some(
					startFil => startFil.type === fil.type && startFil.value === fil.value
				) || fil.type !== FilterType.ID;
			}
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

	/** add bridge filter for many to many relations (e.g. Product => tag type will query ProductTag ids then add the product ids as filter) */
	_addBridgeFilters(
		newFilters: Filter[],
		typenameFiltered?: Typename,
		currentFilterType?: FilterType
	) {
		if (bridgeFiltersConfig[typenameFiltered]?.[currentFilterType]) {
			const { bridgeTypename, resultProp, searchProp } = bridgeFiltersConfig[typenameFiltered]?.[
				currentFilterType
			];
			// TODO add a foreach bridgeType => to work with projectProduct
			newFilters = newFilters.filter(_filter => _filter.type !== FilterType.ID);
			const bridgeFilters = newFilters.filter(_filter => _filter.type === currentFilterType);
			if (!bridgeFilters.length) {
				return newFilters;
			}
			const bridgeIds = bridgeFilters.reduce((ids, _filter) => {
				_filter.ignoreForQuery = true;
				ids.push(_filter.value);
				return ids;
			}, []);
			const entitiesBridge = api[bridgeTypename].findLocal({
				filter: { property: searchProp, inStrings: bridgeIds },
			});
			const bridgeFilter: Partial<Filter> = {};
			bridgeFilter.type = FilterType.ID;
			bridgeFilter.equality = 'inStrings';
			bridgeFilter.value = entitiesBridge.map(entity => entity[resultProp]?.id);
			newFilters.push(bridgeFilter as Filter);
		}
		return newFilters;
	}
}
