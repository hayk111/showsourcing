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

		if (filters.length === 0)
			return {};
		if (filters.length === 1) {
			return this.getFieldCondition(filters[0]);
		}

		const and = [];
		const byType = this.filtersByType(filters);
		byType.forEach((filtersForType) => {
			if (filtersForType.length === 1)
				return and.push(this.getFieldCondition(filtersForType[0]));

			const or = filtersForType.map(filter => this.getFieldCondition(filter))
				// filter falsy
				.filter(x => !!x);
			and.push({ or });
		});
		// if there is no filter we can return an empty filter query arg
		return and.length > 1 ? { and } : and[0];
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private getFieldCondition({ type, value, equality }: Filter) {
		const eq = equality || 'contains';
		switch (type) {
			case FilterType.ARCHIVED:
			case FilterType.FAVORITE:
			case FilterType.DELETED:
				return {
					property: type,
					isTrue: false
				};
			case FilterType.SEARCH:
				return this.getSearchArg(value);
			default:
				return {
					property: `${type}Id`,
					[eq]: value
				};
		}
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

