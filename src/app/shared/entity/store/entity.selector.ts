import { createSelector } from 'reselect';
import { EntityTarget, EntityRepresentation, Entity } from '../models';

export const selectEntities = state => state.entities;

export const selectEntity = (entityName: string) => {
	return createSelector([selectEntities], entities => entities[entityName]);
};

export const selectEntityById = (target: EntityTarget) => {
	return createSelector(
		[selectEntity(target.entityRepr.entityName)],
		entityState => entityState.byId[target.entityId]
	);
};

// returns multiples entities given an array of ids.
export const selectMultipleById = (entityRepr: EntityRepresentation, ids: Array<string>) => {
	return createSelector([selectEntity(entityRepr.entityName)], entityState => {
		return ids.map(id => entityState.byId[id]);
	});
};

// returns all entities of a given repr in an array
export const selectEntityArray = (entityRepr: EntityRepresentation) => {
	return createSelector([selectEntity(entityRepr.entityName)], entityState => {
		return entityState.ids.map(id => entityState.byId[id]);
	});
};

export const selectEntityArrayByName = (entityName: string) => {
	return createSelector([selectEntity(entityName)], entityState => {
		return entityState.ids.map(id => entityState.byId[id]);
	});
};