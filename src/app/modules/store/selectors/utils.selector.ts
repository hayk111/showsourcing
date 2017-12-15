import { createSelector } from 'reselect';
import { EntityTarget } from '../utils/entities.utils';

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
