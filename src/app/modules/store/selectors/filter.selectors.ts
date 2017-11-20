import { createSelector } from '@ngrx/store';
import { Filter, FilterGroup, filterUrlMap, FilterGroupName } from '../model/filter.model';

const r = `It should be defined in the initial state in the store filter.reducer.`;
// Throwing errors here, so it easier to debug than to silently give back something empty.
// fromRoot is just a flag telling if we start from the root state. If false then the state used is state.filters
export const selectFilterCategory = (filterGroupName: FilterGroupName, targetCategory: string, fromRoot = true) => state => {
	const groupFilters = fromRoot ? state.filters[filterGroupName] : state[filterGroupName];
	if (groupFilters === undefined)
		throw Error(`filterGroupName for ${filterGroupName} is undefined. ${r}`);
	const filtersForCategory = groupFilters.filters.filter(f  => f.target === targetCategory);
	return filtersForCategory;
};

export const selectFilterGroup = (filterGroupName: FilterGroupName) => state => {
	const filterGroup = state.filters[filterGroupName];
	if (filterGroup === undefined)
		throw Error(`FilterGroupName for ${filterGroupName} is undefined. ${r}`);
	return filterGroup;
};

export const selectFilterGroupFilters = (filterGroupName: FilterGroupName) => state => {
	const filterGroup = state.filters[filterGroupName];
	if (filterGroup === undefined)
		throw Error(`FilterGroupName for ${filterGroupName} is undefined. ${r}`);
	return filterGroup.filters;
};


export const selectFilterValuesForCategory = (filterGroupName: FilterGroupName, target: string) => state => {
	const filtersForCategory = selectFilterCategory(filterGroupName, target)(state);
	return filtersForCategory.map(f => f.value);
};


export const selectSlice = (slice: string) => state => state[slice];

// selects only the selected filters
// some filters store the value of the filter while some
// store the id of the actual value. This is why things under this are a bit complicated / wonky
export const selectActiveFiltersForCategory = (filterGroupName: FilterGroupName, target: string) => {
	const valsFilteredSelector = selectFilterValuesForCategory(filterGroupName, target);
	const sliceSelector = selectSlice(target);
	return createSelector(valsFilteredSelector, sliceSelector, (valsFiltered, items) => {
		const selectedItems = [];
		// this means it is an entity
		if (items){
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
export const selectFiltersWithChecked = (filterGroup: FilterGroupName, target: string) => {
	const idsFilteredSelector = selectFilterValuesForCategory(filterGroup, target);
	const sliceSelector = selectSlice(target);
	return createSelector(idsFilteredSelector, sliceSelector, (idsFiltered, items) => {
		// making copy as to not modifiate the state directly
		items = JSON.parse(JSON.stringify(items));
		if (items.ids.length > 0)
			idsFiltered.forEach(id => items.byId[id].checked = true);
		return items;
	});
};

export const selectFiltersAsUrlParams = (filterGroup: FilterGroupName) => state => {
	const group = selectFilterGroup(filterGroup)(state);
	let params = '';

	group.filters.forEach(f => {
		// we either get the correct name in the map or chop the last char (because it's a plural with s).
		let val = filterUrlMap[f.target] || f.target.slice(0, -1);
		params += `${val}=${f.value}&`;
	});
	// remove last &
	if (group.filters.length > 0)
		params = params.slice(0, -1);
	return params;
}