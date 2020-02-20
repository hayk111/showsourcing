import { ReplaySubject } from 'rxjs';
import { Filter, FilterType } from '~shared/filters/models/filter.class';
import { ID } from '~utils/id.utils';

/** Weird data structure of Map<filterType, Map<FilterValue, Filter>>
 * Allows us to check in constant time if a filter type has a filter of value x.
 *
 * For example we can answer the question: Does this product has a filter on supplier
 * with id = 10 ?
 *
 * byType.get(FilterType.SUPPLIER).has(id-10)
 */
export type FilterByType = Map<FilterType, Map<ID | boolean, Filter>>;

export class FilterList {
	constructor(startFilters: Filter[] = [], searchedFields = ['name']) {
		// adding the start filters
		this.setFilters(startFilters);
		this.initialFilters = startFilters;
		this.searchedFields = searchedFields;
	}

	/** to know when filters are changing */
	private _valueChanges$ = new ReplaySubject<FilterList>(1);
	valueChanges$ = this._valueChanges$.asObservable();

	/** immovable predicate that stays at all time */
	constPredicate: string;
	/** the filters we start with */
	initialFilters: Filter[];

	/** function used to join the initial predicate, the search and the query as predicate */

	/** the fields that will be searched */
	searchedFields: string[] = ['name'];

	/** adds a search to the predicate and restart setFilters */
	setSearch(value: string) {
		this.search = value;
		this.setFilters([...this._filters]);
		this._valueChanges$.next(this);
	}

	search: string;

	/** current filters sync */
	private _filters: Filter[] = [];
	private setFilters(filters: Filter[]) {
		this._filters = filters;
		this._byType = this.filtersToByType(filters);
		this._filterObject = this.filtersToPredicate(this._byType);
		this._filterObject = this.searchToPredicate(this._filterObject);
		this._valueChanges$.next(this);
	}
	/** returns the array of filters */
	asFilters() {
		return this._filters;
	}

	private _byType: FilterByType;
	/** returns filters by type. Data structure of Map<filterType, Map<FilterValue, Filter>>
	 * Allows us to check if a filter type has a filter of value x.
	 */
	asByType() {
		return this._byType;
	}

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	private _filterObject: any;
	asPredicate(): any {
		return this._filterObject;
	}

	/** adds filter at the end of the array */
	addFilter(added: Filter) {
		this.setFilters([...this._filters, added]);
	}

	addFilters(added: Filter[]) {
		this.setFilters([...this._filters, ...added]);
	}

	/** removes one filter */
	removeFilter(removed: Filter) {
		// removing to array of filters
		this.setFilters(
			this._filters.filter(
				fltr => fltr.type !== removed.type || fltr.value !== removed.value
			)
		);
	}

	/** removes all filters */
	reset() {
		this.setFilters(this.initialFilters);
	}

	/** remove all filters of a given type */
	removeFilterType(type: FilterType) {
		this.setFilters(this._filters.filter(f => f.type !== type));
	}

	hasFilterType(type: FilterType) {
		return this._byType.get(type).size > 0;
	}

	/** return a new map of <type, new Map()> */
	private getInitialMap(): FilterByType {
		const byTypeMap = new Map();
		Object.values(FilterType).forEach(type => byTypeMap.set(type, new Map()));
		return byTypeMap;
	}

	/** returns a new map of <type, <filter.value, filter>> */
	private filtersToByType(filters: Filter[]): FilterByType {
		const copy = this.getInitialMap();
		filters.forEach(fltr => copy.get(fltr.type).set(fltr.value, fltr));
		return copy;
	}

	/** transform filter into a predicate understandable by graphql
	 * we want every filter of the same type to be joined with OR
	 * while when the type differ it's a AND.
	 *
	 * So if we have two supplier filter and one category filter the
	 * predicate will be : {
	 * 	and: [{
	 * 		or: [{supplier: {id: {eq: x}}}, {supplier: {id: {eq: y}}}]
	 * 	},{
	 * 		or: [{category: {id: {eq: z}}}]
	 * 	}]
	 * }
	 */
	private filtersToPredicate(byType: FilterByType) {
		const and = [];
		byType.forEach((valMap, type) => {
			if (valMap.size === 0) return;
			const filtersForType = Array.from(valMap.values());
			const or = filtersForType.map(filter =>
				FilterList.getFieldCondition(filter)
			);
			and.push({ or });
		});
		// if (and.length === 0) and.push({ or: [] });
		return { and };
	}

	/** add the search string to the filter predicate to get the complete search query params */
	private searchToPredicate(filterPredicate) {
		const searchPredicate = [];
		if (this.search) {
			this.searchedFields.forEach(searchedField => {
				searchPredicate.push({ [searchedField]: { match: this.search } });
			});
			filterPredicate.and.push({ or: searchPredicate });
		} else if (!filterPredicate.and.length) {
			filterPredicate.and.push({ or: searchPredicate });
		}
		return filterPredicate;
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private static getFieldCondition({ type, value, equality }: Filter) {
		const eq = equality || 'eq';
		return { [type]: { id: { [eq]: value } } };
	}
}
