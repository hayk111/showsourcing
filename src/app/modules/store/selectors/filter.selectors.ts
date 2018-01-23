import { createSelector } from '@ngrx/store';
import { FilterGroupName, Filter, FilterClass } from '../model/filter.model';
import { deepCopy } from '../utils/deep-copy.utils';
import Log from '../../../utils/logger/log.class';
import { selectEntity, selectEntityArray } from './utils.selector';
import { entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';

const r = `It should be defined in the initial state in the store filter.reducer.`;

const getFilters = (state) => state.ui.filters;

// return filters for a specific group like for example product-page
export const selectFilterGroup = (filterGroupName: FilterGroupName) => {
	if (!filterGroupName)
		throw Error('FilterGroupName undefined in selectFilterGroup. Make sure you pass a value');
	return createSelector([ getFilters ], ( filters ) => {
		Log.debug('selectFilterGroup');
		return filters[filterGroupName] || [];
	});
};

// return map filters by filter class like so: { FilterPrice: [filters], FilterSupplier: [filters] }
export const selectFiltersByName = (filterGroupName: FilterGroupName) => {
	return createSelector([ selectFilterGroup(filterGroupName) ], ( groupFilters: Array<Filter> ) => {
		const byName = new Map();
		groupFilters.forEach((filter: Filter) => {
			// if the map doesn't have the Filter Class yet we add a new array
			if (!byName.has(filter.constructor))
				byName.set(filter.constructor, []);
			byName.get(filter.constructor).push(filter);
		});
		return byName;
	});
};

// select filters for a specific filterClass
export const selectFiltersForClass = (filterGroupName: FilterGroupName, filterClass: FilterClass) => {
	return createSelector([ selectFilterGroup(filterGroupName) ], ( groupFilters: Array<Filter> ) => {
		return groupFilters.filter(f  => f instanceof filterClass);
	});
};

// select filters's values for a specific filterClass
export const selectFiltersValues = (filterGroupName: FilterGroupName, filterClass: FilterClass) => {
	return createSelector([ selectFiltersForClass(filterGroupName, filterClass) ], ( groupFilters: Array<Filter> ) => {
		return groupFilters.filter(f  => f instanceof filterClass).map(f => f.value);
	});
};


// selects only the selected filters
// some filters store the value of the filter while some
// store the id of the actual value. This is why things under this are a bit complicated / wonky
// export const selectActiveFiltersForTargetEntity = (filterGroupName: FilterGroupName, rep: FilterRepresentation) => {
// 	return createSelector(
// 		[
// 			selectFilterValuesForEntity(filterGroupName, rep),
// 			selectEntity(rep.entityName)
// 		],
// 		(valsFiltered, items) => {
// 			Log.debug(`selectEntitiesWithChecked ${filterGroupName}, entityRepr: ${rep.entityName}`);
// 			const selectedItems = [];
// 			// this means it is an entity
// 			if (items) {
// 				if (items.ids.length > 0)
// 				valsFiltered.forEach(id => selectedItems.push(items.byId[id]));
// 			} else {
// 				// this means it's not an entity (could be price or w.e)
// 				selectedItems.forEach(val => selectedItems.push(val));
// 			}
// 			return selectedItems;
// 		}
// 	);
// };

// // makes a copy of all items, and add checked true if it's present in filter's value.
// export const selectEntitiesWithChecked = (filterGroup: FilterGroupName, rep: FilterRepresentation) => {
// 	return createSelector(
// 		[
// 			selectFilterValuesForEntity(filterGroup, rep),
// 			selectEntity(rep.entityName)
// 		],
// 		(idsFiltered, items) => {
// 			Log.debug(`selectEntitiesWithChecked ${filterGroup}, entityRepr: ${rep.entityName}`);
// 			// making copy as to not modifiate the state directly
// 			items = deepCopy(items);
// 			// adding count for each item to it.
// 			if (items.ids.length > 0)
// 				idsFiltered.forEach(id => items.byId[id].checked = true);
// 			return items;
// 		}
// 	);
// };

export const selectFiltersAsUrlParams = (filterGroup?: FilterGroupName) => {
	return createSelector(
		[
			selectFilterGroup(filterGroup),
		],
		(filters) => {
			Log.debug(`selectFiltersAsUrlParams ${filterGroup}`);
			return filters.reduce((prev: string, curr: Filter) => prev += `${curr.toUrlParam()}&`, '');
		}
	);
};


// export const selectFilteredEntity = (filterGroupName: FilterGroupName, entityRepr: EntityRepresentation) => {
// 	return createSelector([
// 		selectFilterGroup(filterGroupName),
// 		selectEntityArray(entityRepr)
// 	],
// 	(filters, products) => {
// 		const returned = [];
// 		products.forEach(product => {
// 			if (filters.every((filter: Filter) => filter.filterRepr.filterFn(product)))
// 				returned.push(product);
// 		});
// 	});
// };

