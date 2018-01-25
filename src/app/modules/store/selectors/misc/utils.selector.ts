import { createSelector } from 'reselect';
import { EntityTarget, EntityRepresentation } from '../utils/entities.utils';

export const selectEntities = state => state.entities;

export const selectEntity = (entityName: string) => {
	return createSelector([selectEntities], entities => entities[entityName]);
};

export const selectEntityById = (target: EntityTarget) => {
	return createSelector(
		[ selectEntity(target.entityRepr.entityName) ],
		entityState => entityState.byId[target.entityId]
	);
};

export const selectEntityArray = (entityRepr: EntityRepresentation) => {
	return createSelector([selectEntity(entityRepr.entityName)], entityState => {
		return entityState.ids.map( id => entityState.byId[id]);
	});
};

