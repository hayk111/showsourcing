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
	[x: string]: any;
}

/**
 * Helper class to help with filter convertion
 */
export class FilterConverter {

	constructor(private searchedFields = ['name']) {}

	/** returns a new map of <type, <filter.value, filter>> */
	valuesByType(filters: Filter[]): ValuesByType {
		const byTypeMap = new Map();
		Object.values(FilterType).forEach(type => byTypeMap.set(type, new Set()));
		filters.forEach(fltr => byTypeMap.get(fltr.type).add(fltr.value));
		return byTypeMap;
	}

	filtersByType(filters: Filter[]): FiltersByType {
		const byTypeMap = new Map();
		Object.values(FilterType).forEach(type => byTypeMap.set(type, []));
		filters.forEach(fltr => byTypeMap.get(fltr.type).push(fltr));
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
	filtersToQueryArg(byType: FiltersByType, filters: Filter[]): any {

		if (filters.length === 0)
			return {};
		if (filters.length === 1)
			return this.getFieldCondition(filters[0]);

		const and = [];
		byType.forEach((fForType, type) => {
			// for each filter type we check if there is a filter present, if not we pass
			if (fForType.length === 0)
				return;
			if (fForType.length === 1)
				return this.getFieldCondition(fForType[0]);

			const or = fForType.map(filter =>
				this.getFieldCondition(filter)
				// filter falsy
			).filter(x => !!x);
			and.push({ or });
		});
		// if there is no filter we can return an empty filter query arg
		return { and };
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

