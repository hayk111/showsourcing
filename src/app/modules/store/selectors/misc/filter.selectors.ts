import { createSelector } from '@ngrx/store';
import { FilterGroupName, Filter, FilterClass } from '../../model/misc/filter.model';
import { Log } from '@utils/index';
import { selectEntityArray } from './utils.selector';
import { EntityRepresentation } from '../../utils/entities.utils';

const r = `It should be defined in the initial state in the store filter.reducer.`;

const getFilters = (state) => state.misc.filters;

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


export const selectFilteredEntity = (filterGroupName: FilterGroupName, entityRepr: EntityRepresentation) => {
	return createSelector([
		selectFilterGroup(filterGroupName),
		selectEntityArray(entityRepr)
	],
	(filters, products) => {
		const returned = [];
		products.forEach(product => {
			if (filters.every((afilter: Filter) => afilter.filter(product)))
				returned.push(product);
		});
		return returned;
	});
};

