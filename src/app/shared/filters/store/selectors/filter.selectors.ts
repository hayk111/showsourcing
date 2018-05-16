import { createSelector } from '@ngrx/store';
import { Log } from 'app/app-root/utils';
import { selectEntityArray } from '~app/entity/store';

import { Filter, FilterGroupName } from '../../models/filter.model';
import { EntityRepresentation } from '~app/entity';

const r = `It should be defined in the initial state in the store filter.reducer.`;

// return all filtergroups
const getFilters = state => state.filters;

// return filters for a specific group like for example product-page
export const selectFilterGroup = (filterGroupName: FilterGroupName) => {
	if (!filterGroupName)
		throw Error('FilterGroupName undefined in selectFilterGroup. Make sure you pass a value');
	return createSelector([getFilters], filters => {
		return filters[filterGroupName] || [];
	});
};

// filters for a group are storred as array, this returns a map of every filter
// Map<filterType, Map<filterValue, filter>>
// this way we can easily display filters for a given type with
// map.get(type).values();
// or check in constant time if a value has been picked already
// map.get(type).has(value);
export const selectFilterByType = (filterGroupName: FilterGroupName) => {
	return createSelector([selectFilterGroup(filterGroupName)], (groupFilters: Array<Filter>) => {
		const byType = new Map();
		// let's add an __all__ for every value
		byType.set('__all__', new Map());
		groupFilters.forEach((filter: Filter) => {
			// if the map doesn't have the Filter Class yet we add a new array
			if (!byType.has(filter.type))
				byType.set(filter.type, new Map<string, Filter>());
			byType.get(filter.type).set(filter.value, filter);
			byType.get('__all__').set(filter.value, filter);
		});
		return byType;
	});
};
