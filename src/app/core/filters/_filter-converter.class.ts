import { Filter } from './filter.class';
import { FilterType } from './filter-type.enum';
import { ValuesByType, FiltersByType } from './filter-by.type';

/**
 * Helper class to help with filter convertion
 */
export class FilterConverter {

	constructor(private searchedFields = ['name']) {}

	/** returns a new map of <type, <filter.value, filter>> */
	valuesByType(filters: Filter[]): ValuesByType {
		const byTypeMap = new Map();
		filters.forEach(fltr => {
			const map = byTypeMap.get(fltr.type) || new Set();
			map.add(fltr.value);
			byTypeMap.set(fltr.type, map);
		});
		return byTypeMap;
	}

	filtersByType(filters: Filter[]): FiltersByType {
		const byTypeMap = new Map();
		filters.forEach(fltr => {
			const array = byTypeMap.get(fltr.type) || [];
			array.push(fltr);
			byTypeMap.set(fltr.type, array);
		});
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
	 *
	 * Attention: the filters in an array are ordened with the order that is in FilterType
	 */
	filtersToQueryArg(filters: Filter[]): any {
		if (filters.length === 0) {
			return {};
		}
		if (filters.length === 1) {
			return filters[0];
		}
		const and = [];
		filters.forEach(filter => {
			const secondKey = Object.keys(filter)[1];
			and.push({
				property: (filter as any).property || (filter as any).type,
				[secondKey]: filter[secondKey]
			});
		});
		return and.length > 1 ? { and } : and[0];
	}

	/** add the search string to the filter predicate to get the complete search query params */
	private getSearchArg(value: string) {
		const searchArg = { or: [] };
		if (this.searchedFields.length === 1) {
			return {
				property: this.searchedFields[0],
				contains:  value.toLowerCase()
			};
		}
		this.searchedFields.forEach(searchedField => {
			searchArg.or.push({
				property: searchedField,
				contains:  value.toLowerCase()
			});
		});
		return searchArg;
	}

}

