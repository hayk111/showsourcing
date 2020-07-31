import { Filter } from './filter.class';
import { FilterType } from './filter-type.enum';
import { ValuesByType, FiltersByType } from './filter-by.type';
import _ from 'lodash';

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
			return this.getFieldCondition((filters[0] as any).property || (filters[0] as any).type, filters[0]);
		}

		let and = [];
		filters.forEach(filter => {
			const or = [];
			const property = (filter as any).property || (filter as any).type;
			// finding duplicate filters in the "and" array
			const propertiesWithType = this.propertyInArr(property, and);

			if (propertiesWithType.length) {
				const index = and.findIndex((item) => ('or' in item) && item.or[0].property.startsWith(property));
				and.splice(index, 1);

				or.push(...propertiesWithType, this.getFieldCondition(property, filter));
				and.push({or});
				and = and.filter((item) => {
					return 'property' in item ? !item.property.startsWith(property) : true ;
				});
				return;
			}

			and.push(this.getFieldCondition(property, filter));
		});
		return and.length > 1 ? { and } : and[0];
	}

	/** the way a Filter is translated into graphql changes with
	 * its type. This method return the translated predicate
	 */
	private getFieldCondition(type: FilterType, { value, equality }: Partial<Filter>) {
		const eq = equality || 'contains';
		switch (type) {
			case FilterType.DELETED:
			case FilterType.ARCHIVED:
			case FilterType.FAVORITE:
				return {
					property: type,
					isTrue: value
				};
			case FilterType.SEARCH:
				return {
					property: this.searchedFields[0], // TODO: implement multiple filters pass
					contains: value
				};
			case FilterType.SUPPLIER:
			case FilterType.CATEGORY:
				return {
					property: type,
					isString: value
				};
			default:
				return {
					property: type,
					[eq]: value
				};
		}
	}

	private propertyInArr(prop: string, arr: any[]): any[] {
		let propertyMatches = [];
		arr.forEach((item) => {
			if (('property' in item) && item.property.startsWith(prop)) {
				propertyMatches.push(item);
			}

			if ('or' in item) {
				propertyMatches = item.or.filter(elem => ('property' in elem) && elem.property.startsWith(prop));
			}
		});

		return propertyMatches;
	}

}

