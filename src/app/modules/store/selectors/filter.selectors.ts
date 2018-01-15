import { createSelector } from '@ngrx/store';
import { Filter, FilterGroupName, FilterRepresentation } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import Log from '../../../utils/logger/log.class';
import { selectEntity } from './utils.selector';

const r = `It should be defined in the initial state in the store filter.reducer.`;
const getFilters = (state) => state.ui.filters;

export const selectFilterGroup = (filterGroupName: FilterGroupName) => {
	return createSelector([ getFilters ], ( filters ) => {
		Log.debug(`selectFilterGroup ${filterGroupName}`);
		let filterGroup = filters[filterGroupName];
		if (filterGroup === undefined) {
			Log.warn(`FilterGroupName for ${filterGroupName} is undefined. ${r}`);
			filterGroup = [];
		}
		return filterGroup;
	});
};


export const selectFilterForEntity = (filterGroupName: FilterGroupName, rep: FilterRepresentation, fromRoot = true) => {
	return createSelector([ selectFilterGroup(filterGroupName) ], ( groupFilters: Array<Filter> ) => {
		Log.debug(`selectFilterForEntity ${filterGroupName}, entityRepr: ${rep.entityName}`);
		const filtersForTarget = groupFilters.filter(f  => f.filterRepr.entityName === rep.entityName);
		return filtersForTarget;
	});
};

export const selectFilterForEntities = (filterGroupName: FilterGroupName, reps: Array<FilterRepresentation>) => {
	return createSelector([ selectFilterGroup(filterGroupName) ], ( groupFilters: Array<Filter> ) => {
		const filtersForTarget = groupFilters.filter(f  => reps.find((rep: any) => rep.entityName === f.filterRepr.entityName));
		return filtersForTarget;
	});
};


export const selectFilterValuesForEntity = (filterGroupName: FilterGroupName, rep: FilterRepresentation) => {
	return createSelector([ selectFilterForEntity(filterGroupName, rep) ], ( filters: Array<Filter> ) => {
		Log.debug(`selectFilterValuesForEntity ${filterGroupName}, filterRepr: ${rep.entityName}`);
		return filters.map(f => f.value);
	});
};

// selects only the selected filters
// some filters store the value of the filter while some
// store the id of the actual value. This is why things under this are a bit complicated / wonky
export const selectActiveFiltersForTargetEntity = (filterGroupName: FilterGroupName, rep: FilterRepresentation) => {
	return createSelector(
		[
			selectFilterValuesForEntity(filterGroupName, rep),
			selectEntity(rep.entityName)
		],
		(valsFiltered, items) => {
			Log.debug(`selectEntitiesWithChecked ${filterGroupName}, entityRepr: ${rep.entityName}`);
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
export const selectEntitiesWithChecked = (filterGroup: FilterGroupName, rep: FilterRepresentation) => {
	return createSelector(
		[
			selectFilterValuesForEntity(filterGroup, rep),
			selectEntity(rep.entityName)
		],
		(idsFiltered, items) => {
			Log.debug(`selectEntitiesWithChecked ${filterGroup}, entityRepr: ${rep.entityName}`);
			// making copy as to not modifiate the state directly
			items = deepCopy(items);
			// adding count for each item to it.
			if (items.ids.length > 0)
				idsFiltered.forEach(id => items.byId[id].checked = true);
			return items;
		}
	);
};

export const selectFiltersAsUrlParams = (filterGroup?: FilterGroupName) => {
	return createSelector(
		[
			selectFilterGroup(filterGroup),
		],
		(filters) => {
			Log.debug(`selectFiltersAsUrlParams ${filterGroup}`);
			let params = '';
			filters.forEach((f: Filter) => params += `${f.filterRepr.urlName}=${f.value}&`);
			// remove last &
			if (filters.length > 0)
				params = params.slice(0, -1);
			return params;
		}
	);
};


