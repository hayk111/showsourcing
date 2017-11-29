import { createSelector } from 'reselect';

export const selectEntities = state => state.entities;

export const selectEntity = (entityName: string) => {
	return createSelector([selectEntities], entities => entities[entityName]);
};
