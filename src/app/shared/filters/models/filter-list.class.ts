import { Subject } from 'rxjs';
import { Filter, FilterType } from '~shared/filters/models/filter.class';
import { ID } from '~utils/id.utils';


/** Weird data structure of Map<filterType, Map<FilterValue, Filter>>
 * Allows us to check in constant time if a filter type has a filter of value x.
 *
 * For example we can answer the question: Does this product has a filter on supplier
 * with id = 10 ?
 *
 * byType.get(ERM.SUPPLIER).has(id-10)
 */
export type FilterByType = Map<FilterType, Map<ID | boolean, Filter>>;


export class FilterList {

	/** to know when filters are changing */
	private _valueChanges$ = new Subject<FilterList>();
	valueChanges$ = this._valueChanges$.asObservable();

	/** immovable predicate that stays at all time */
	constPredicate: string;

	/** function used to join the initial predicate, the search and the query as predicate */
	predicateFn = (initial, search, query) => [initial, search, query].filter(p => !!p).join(' AND ');

	/** the fields that will be searched */
	searchedFields: string[] = ['name'];
	/** adds a search to the predicate */
	setSearch(value: string) {
		this.search = value;
		this._valueChanges$.next(this);
	}

	getSearchStr() {
		if (!this.search) {
			return '';
		} else {
			return this.searchedFields
				.map(field => `${field} CONTAINS[c] "${this.search}"`)
				.join(' OR ');
		}
	}
	private search: string;

	/** current filters sync */
	private _filters: Filter[] = [];
	private setFilters(filters: Filter[]) {
		this._filters = filters;
		this._byType = this.filtersToByType(filters);
		this._query = this.filtersToPredicate(this._byType);
		this._valueChanges$.next(this);
	}
	asFilters() { return this._filters; }


	private _byType: FilterByType;
	asByType() { return this._byType; }

	/**
	 * Returns the filters as a query usable by apollo client
	 */
	private _query: string;
	asPredicate(): string {
		return this.predicateFn(this.constPredicate, this.getSearchStr(), this._query);
	}

	constructor(startFilters: Filter[] = [], constPredicate?: string) {
		// adding the start filters
		this.setFilters(startFilters);
		this.constPredicate = constPredicate;
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
				fltr => (fltr.type !== removed.type || fltr.value !== removed.value)
			)
		);
	}

	/** removes all filters */
	resetAll() {
		this.setFilters([]);
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
		Object.values(FilterType)
			.forEach(type => byTypeMap.set(type, new Map()));
		return byTypeMap;
	}

	/** returns a new map of <type, <filter.value, filter>> */
	private filtersToByType(filters: Filter[]): FilterByType {
		const copy = this.getInitialMap();
		filters.forEach(fltr => copy.get(fltr.type).set(fltr.value, fltr));
		return copy;
	}


	private filtersToPredicate(byType: FilterByType): string {
		return FilterList.filtersToPredicate(byType);
	}

	/** transform filter into a predicate understandable by graphql
	 * we want every filter of the same type to be joined with OR
	 * while when the type differ it's a AND.
	 *
	 * So if we have two supplier filter and one category filter the
	 * predicate will be : (supplier.id == x OR supplier.id == y AND category.id == z)
	*/
	static filtersToPredicate(byType: FilterByType) {
		const queryByType = [];
		byType.forEach((valMap, type) => {
			if (valMap.size === 0)
				return;
			const valuesForType = Array.from(valMap.keys());
			const queryForType = valuesForType.map(value => {
				return FilterList.getFieldCondition(type, value);
			}).join(' or ');
			queryByType.push(`(${queryForType})`);
		});
		return queryByType.join(' AND ');
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private static getFieldCondition(type, value) {
		switch (type) {
			case FilterType.DELETED:
			case FilterType.DONE:
			case FilterType.FAVORITE:
			case FilterType.ARCHIVED:
				return `${type} == ${value}`;
			case FilterType.CREATED_BY:
				return `createdBy.id == "${value}"`;
			case FilterType.DUE_DATE:
				return `dueDate >= ${value} OR dueDate == null`;
			case FilterType.CUSTOM:
				return value;
			// most of the filters from the panel filter by id
			default:
				return `${type}.id == "${value}"`;
		}
	}

}
