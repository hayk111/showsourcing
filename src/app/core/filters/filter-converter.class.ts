import { Filter } from './filter.class';
import { FilterType } from './filter-type.enum';
import { ValuesByType, FiltersByType } from './filter-list.class';


/**
 * Helper class to help with filter convertion
 */
export class FilterConverter {

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
	filtersToArg(byType: FiltersByType, searchedFields: string[]) {
		const and = [];
		byType.forEach((filters, type) => {
			// for each filter type we check if there is a filter present, if not we pass
			if (filters.length === 0) return;
			const or = filters.map(filter =>
				this.getFieldCondition(filter)
			);
			and.push({ or });
		});
		// if (and.length === 0) and.push({ or: [] });
		return { and };
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private getFieldCondition({ type, value, equality }: Filter, searchedFields: string[]) {
		const eq = equality || 'eq';
		switch (type) {
			case FilterType.ARCHIVED:
			case FilterType.FAVORITE:
					return { [type]: value };
			case FilterType.SEARCH:
					
			default:
				return { [type]: { id: { [eq]: value } } };
		}
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




}

