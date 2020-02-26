import { ReplaySubject } from 'rxjs';
import { FilterConverter } from './filter-converter.class';
import { FilterType } from './filter-type.enum';
import { Filter } from './filter.class';

/** so we can check if a filter type has a specific value, filterList.valuesByType.get(FilterType.SUPPLIER).has(id-10) */
export type ValuesByType = Map<FilterType, Set<any>>;
/** so we can display the filters for a given type */
export type FiltersByType = Map<FilterType, Filter[]>;


export class FilterList {
	/** helper */
	private converter: FilterConverter;
	/** to know when filters are changing, using replay subject here because in the constructor we set the starting ones */
	private _valueChanges$ = new ReplaySubject<FilterList>(1);
	valueChanges$ = this._valueChanges$.asObservable();
	/** the filters currently in the filter-list */
	filters: Filter[] = [];
	/** so we can check if a filter type has a specific value, filterList.valuesByType.has(id-10) */
	valuesByType: ValuesByType = new Map();
	/** so we can display the filters for a given type */
	filtersByType: FiltersByType = new Map();
	/** the search string currently in the filter list */
	search: string;
	/** filter as a param form that can be used in a query */
	queryArg: any;

	constructor(
		private startFilters: Filter[] = []
	) {
		// adding the start filters
		this.setFilters(startFilters);
		this.converter = new FilterConverter(searchedfields);
	}

	/** function that sets the filter of the filter list, also construct the different util object (by type, filter param) */
	setFilters(filters: Filter[]) {
		this.filters = filters;
		this.valuesByType = this.converter.valuesByType(filters);
		this.filtersByType = this.converter.filtersByType(filters);
		this.queryArg = this.converter.filtersToQueryArg(this.byType);
		this.emit();
	}

	/** emits a new value */
	private emit() {
		this._valueChanges$.next(this);
	}

	/** adds a search to the predicate and restart setFilters */
	setSearch(value: string) {
		this.addFilter({ type: FilterType.SEARCH, value });
	}

	/** adds one filter */
	addFilter(added: Filter) {
		this.setFilters([...this.filters, added]);
	}

	/** adds multiple filters */
	addFilters(added: Filter[]) {
		this.setFilters([...this.filters, ...added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		this.setFilters(
			this.filters.filter(
				fltr => fltr.type !== removed.type || fltr.value !== removed.value
			)
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
		return this.valuesByType.get(type).size > 0;
	}

}
