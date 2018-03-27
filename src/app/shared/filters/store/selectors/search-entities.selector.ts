import { createSelector, OutputSelector } from 'reselect';
import { FilterEntityClass, FilterGroupName } from '~shared/filters/models';
import { selectFiltersValues } from './filter.selectors';
import { Log } from '~utils';

import { selectEntityArray, EntityRepresentation, Entity } from '~entity/store';
import { MemoizedSelector } from '@ngrx/store';

export interface SmartSearch {
	repr: EntityRepresentation;
	selected: Array<any>;
	result: Array<Entity>;
}

// returns entities given that startwith string
export const searchEntity = (repr: EntityRepresentation, str: string) => {
	return createSelector([selectEntityArray(repr)], entities => {
		Log.debug('searching entity for string');
		// with no search terms we return all entities
		if (str === '') return entities;
		else {
			const result = entities.filter(entity => entity.name.includes(str)) as Array<Entity>;
			return result;
		}
	});
};

export interface SearchedEntities {
	repr: EntityRepresentation;
	result: Array<Entity>;
}

// returns an array like so [
// 	{ repr: someRepr, result: [entities]}
// ]
export const searchEntities = (reprs: Array<EntityRepresentation>, str: string) => {
	const sels = reprs.map(repr => searchEntity(repr, str)) as any;
	return createSelector(sels, (...results) => {
		results = results
			.map((entities, i: number) => ({
				repr: reprs[i],
				result: entities,
			}))
			.filter(r => r.result.length > 0);
		return results;
	});
};
