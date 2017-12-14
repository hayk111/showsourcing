import { createSelector } from '@ngrx/store';
import { Filter, FilterGroupName } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import Log from '../../../utils/logger/log.class';
import { selectEntity } from './utils.selector';
import { EntityRepresentation } from '../utils/entities.utils';

const r = `It should be defined in the initial state in the store filter.reducer.`;
const getFilters = (state) => state.ui.filters;

export const selectFilterGroup = (filterGroupName: FilterGroupName) => {
	return createSelector([ getFilters ], ( filters ) => {
		Log.debug(`selectFilterGroup ${filterGroupName}`);
		const filterGroup = filters[filterGroupName];
		if (filterGroup === undefined)
			throw Error(`FilterGroupName for ${filterGroupName} is undefined. ${r}`);
		return filterGroup;
	});
};


// Throwing errors here, so it easier to debug than to silently give back something empty.
// fromRoot is just a flag telling if we start from the root state. If false then the state used is state.filters
export const selectFilterForEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation, fromRoot = true) => {
	return createSelector([ selectFilterGroup(filterGroupName) ], ( groupFilters: Array<Filter> ) => {
		Log.debug(`selectFilterForEntity ${filterGroupName}, entityRepr: ${entityRep.entityName}`);
		const filtersForTarget = groupFilters.filter(f  => f.entityRepr.entityName === entityRep.entityName);
		return filtersForTarget;
	});
};



export const selectFilterValuesForEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation) => {
	return createSelector([ selectFilterForEntity(filterGroupName, entityRep) ], ( filters: Array<Filter> ) => {
		Log.debug(`selectFilterValuesForEntity ${filterGroupName}, entityRepr: ${entityRep.entityName}`);
		return filters.map(f => f.value);
	});
};

// selects only the selected filters
// some filters store the value of the filter while some
// store the id of the actual value. This is why things under this are a bit complicated / wonky
export const selectActiveFiltersForTargetEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation) => {
	return createSelector(
		[
			selectFilterValuesForEntity(filterGroupName, entityRep),
			selectEntity(entityRep.entityName)
		],
		(valsFiltered, items) => {
			Log.debug(`selectEntitiesWithChecked ${filterGroupName}, entityRepr: ${entityRep.entityName}`);
			const selectedItems = [];
			// this means it is an entity
			if (items) {
				if (items.ids.length > 0)
				valsFiltered.forEach(id => selectedItems.push(items.byId[id]));
			} else {
				// this means it's not an entity (could be price or w.e)
				selectedItems.forEach(val => selectedItems.push(val));
			}
			return selectedItems;
		}
	);
};

// makes a copy of all items, and add checked true if it's present in filter's value.
export const selectEntitiesWithChecked = (filterGroup: FilterGroupName, entityRep: EntityRepresentation) => {
	return createSelector(
		[
			selectFilterValuesForEntity(filterGroup, entityRep),
			selectEntity(entityRep.entityName)
		],
		(idsFiltered, items) => {
			Log.debug(`selectEntitiesWithChecked ${filterGroup}, entityRepr: ${entityRep.entityName}`);
			// making copy as to not modifiate the state directly
			items = deepCopy(items);
			// adding count for each item to it.
			if (items.ids.length > 0)
				idsFiltered.forEach(id => items.byId[id].checked = true);
			return items;
		}
	);
};

export const selectFiltersAsUrlParams = (filterGroup: FilterGroupName) => {
	return createSelector(
		[
			selectFilterGroup(filterGroup),
		],
		(filters) => {
			Log.debug(`selectFiltersAsUrlParams ${filterGroup}`);
			let params = '';
			filters.forEach((f: Filter) => params += `${f.entityRepr.urlName}=${f.value}&`);
			// remove last &
			if (filters.length > 0)
				params = params.slice(0, -1);
			return params;
		}
	);
};


