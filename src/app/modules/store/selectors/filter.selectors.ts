import { createSelector } from '@ngrx/store';
import { Filter, FilterGroupName, EntityRepresentation } from '../model/filter.model';
import { selectSlice } from './slice.selector';
import { deepCopy } from '../utils/deep-copy.utils';

const r = `It should be defined in the initial state in the store filter.reducer.`;

export const selectFilterGroup = (filterGroupName: FilterGroupName) => (state): Array<Filter> => {
	const filterGroup = state.filters[filterGroupName];
	if (filterGroup === undefined)
		throw Error(`FilterGroupName for ${filterGroupName} is undefined. ${r}`);
	return filterGroup;
};


// Throwing errors here, so it easier to debug than to silently give back something empty.
// fromRoot is just a flag telling if we start from the root state. If false then the state used is state.filters
export const selectFilterForEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation, fromRoot = true) =>
(state): Array<Filter> => {
	const groupFilters = fromRoot ? state.filters[filterGroupName] : state[filterGroupName];
	if (groupFilters === undefined)
		throw Error(`filterGroupName for ${filterGroupName} is undefined. ${r}`);
	const filtersForTarget = groupFilters.filter(f  => f.entityRepr.entityName === entityRep.entityName);
	return filtersForTarget;
};


export const selectFilterValuesForEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation) =>
(state): Array<any> => {
	const filtersForCategory = selectFilterForEntity(filterGroupName, entityRep)(state);
	return filtersForCategory.map(f => f.value);
};

// selects only the selected filters
// some filters store the value of the filter while some
// store the id of the actual value. This is why things under this are a bit complicated / wonky
export const selectActiveFiltersForTargetEntity = (filterGroupName: FilterGroupName, entityRep: EntityRepresentation) => {
	const valsFilteredSelector = selectFilterValuesForEntity(filterGroupName, entityRep);
	const sliceSelector = selectSlice(entityRep.entityName);
	return createSelector(valsFilteredSelector, sliceSelector, (valsFiltered, items) => {
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
	});
};

// makes a copy of all items, and add checked true if it's present in filter's value.
export const selectEntitiesWithChecked = (filterGroup: FilterGroupName, entityRep: EntityRepresentation) => {
	const idsFilteredSelector = selectFilterValuesForEntity(filterGroup, entityRep);
	const sliceSelector = selectSlice(entityRep.entityName);
	return createSelector(idsFilteredSelector, sliceSelector, (idsFiltered, items) => {
		// making copy as to not modifiate the state directly
		items = deepCopy(items);
		// adding count for each item to it.
		if (items.ids.length > 0)
			idsFiltered.forEach(id => items.byId[id].checked = true);
		return items;
	});
};

export const selectFiltersAsUrlParams = (filterGroup: FilterGroupName) => state => {
	const filters = selectFilterGroup(filterGroup)(state);
	let params = '';
	filters.forEach((f: Filter) => params += `${f.entityRepr.urlName}=${f.value}&`);
	// remove last &
	if (filters.length > 0)
		params = params.slice(0, -1);
	return params;
};


