import { createSelector } from 'reselect';
import { Entity, EntityRepresentation, selectEntityArray } from '~entity/store';
import { Log } from '~utils';

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
		if (str === '')
			return entities;
		else
			return entities.filter(entity => entity.name.includes(str)) as Array<Entity>;
	});
};

