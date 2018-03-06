import { createSelector } from '@ngrx/store';
import { Log } from 'app/app-root/utils';
import { EntityRepresentation } from '~entity/models';
import { selectEntityArray } from '~entity/store/selectors';

import {
	Filter,
	FilterClass,
	FilterGroupName,
} from '../../models/filter.model';

const r = `It should be defined in the initial state in the store filter.reducer.`;

// return all filtergroups
const getFilters = state => state.misc.filters;

// return filters for a specific group like for example product-page
export const selectFilterGroup = (filterGroupName: FilterGroupName) => {
	if (!filterGroupName)
		throw Error(
			'FilterGroupName undefined in selectFilterGroup. Make sure you pass a value'
		);
	return createSelector([getFilters], filters => {
		Log.debug('selectFilterGroup');
		return filters[filterGroupName] || [];
	});
};

// return map filters by filter class like so: { FilterPrice: [filters], FilterSupplier: [filters] }
export const selectFiltersByName = (filterGroupName: FilterGroupName) => {
	return createSelector(
		[selectFilterGroup(filterGroupName)],
		(groupFilters: Array<Filter>) => {
			const byName = new Map();
			groupFilters.forEach((filter: Filter) => {
				// if the map doesn't have the Filter Class yet we add a new array
				if (!byName.has(filter.constructor)) byName.set(filter.constructor, []);
				byName.get(filter.constructor).push(filter);
			});
			return byName;
		}
	);
};

// select filters for a specific filterClass :  [filters]: Array<FilterPrice>
export const selectFiltersForClass = (
	filterGroupName: FilterGroupName,
	filterClass: FilterClass
) => {
	return createSelector(
		[selectFilterGroup(filterGroupName)],
		(groupFilters: Array<Filter>) => {
			return groupFilters.filter(f => f instanceof filterClass);
		}
	);
};

// select filters's values for a specific filterClass, same as above but only values
export const selectFiltersValues = (
	filterGroupName: FilterGroupName,
	filterClass: FilterClass
) => {
	return createSelector(
		[selectFiltersForClass(filterGroupName, filterClass)],
		(groupFilters: Array<Filter>) => {
			return groupFilters.map(f => f.value);
		}
	);
};

// returns a string like supplier=id&event=id&...
export const selectFiltersAsUrlParams = (filterGroup?: FilterGroupName) => {
	return createSelector([selectFilterGroup(filterGroup)], filters => {
		Log.debug(`selectFiltersAsUrlParams ${filterGroup}`);
		return filters.reduce(
			(prev: string, curr: Filter) => (prev += `${curr.toUrlParam()}&`),
			''
		);
	});
};

/**
 * Selects filtered entities
 * @param filterGroupName - The filter group name
 * @param { EntityRepresentation } entityRepr - The entityRepresentation we want to select
 */
export const selectFilteredEntity = (
	filterGroupName: FilterGroupName,
	entityRepr: EntityRepresentation
) => {
	return createSelector(
		[selectFilterGroup(filterGroupName), selectEntityArray(entityRepr)],
		(filters, entities) => {
			const returned = [];
			entities.forEach(entity => {
				if (filters.every((afilter: Filter) => afilter.filter(entity)))
					returned.push(entity);
			});
			return returned;
		}
	);
};
