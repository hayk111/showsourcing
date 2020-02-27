import { Filter } from './filter.class';
import { FilterType } from './filter-type.enum';

/** so we can check if a filter type has a specific value, filterList.valuesByType.get(FilterType.SUPPLIER).has(id-10) */
export type ValuesByType = Map<FilterType, Set<any>>;
/** so we can display the filters for a given type */
export type FiltersByType = Map<FilterType, Filter[]>;

export interface OrFilters {
	or: any[];
}
export interface QueryArg {
	and?: OrFilters[];
}

/**
 * Helper class to help with filter convertion
 */
export class FilterConverter {

	constructor(private searchedFields = ['name']) {}

	/** returns a new map of <type, <filter.value, filter>> */
	valuesByType(filters: Filter[]): ValuesByType {
		const copy = this.getInitialMap(Set);
		filters.forEach(fltr => copy.get(fltr.type).add(fltr.value));
		return copy;
	}

	filtersByType(filters: Filter[]): FiltersByType {
		const copy = this.getInitialMap(Array);
		filters.forEach(fltr => copy.get(fltr.type).add(fltr));
		return copy;
	}

	/** return a new map of <type, new Map()> , so we have a map for each type*/
	private getInitialMap(initalObject): Map<FilterType, any> {
		const byTypeMap = new Map();
		Object.values(FilterType).forEach(type => byTypeMap.set(type, new initalObject()));
		return byTypeMap;
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
	filtersToQueryArg(byType: FiltersByType): QueryArg {
		const and = [];
		byType.forEach((filters, type) => {
			// for each filter type we check if there is a filter present, if not we pass
			if (filters.length === 0) return;
			const or = filters.map(filter =>
				this.getFieldCondition(filter)
				// filter falsy
			).filter(x => !!x);
			and.push({ or });
		});
		// if there is no filter we can return an empty filter query arg
		return and.length > 0 ? { and } : { };
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private getFieldCondition({ type, value, equality }: Filter) {
		const eq = equality || 'eq';
		switch (type) {
			case FilterType.ARCHIVED:
			case FilterType.FAVORITE:
				return { [type]: value };
			case FilterType.SEARCH:
				return this.getSearchArg(value);
			default:
				return { [type]: { id: { [eq]: value } } };
		}
	}

	/** add the search string to the filter predicate to get the complete search query params */
	private getSearchArg(value: string) {
		const searchArg = { or: []};
		this.searchedFields.forEach(searchedField => {
			searchArg.or.push({ [searchedField]: { match: value } });
		});
		return searchArg;
	}

}

