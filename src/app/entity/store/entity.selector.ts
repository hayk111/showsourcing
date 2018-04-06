import { createSelector } from 'reselect';
import { EntityTarget, EntityRepresentation, Entity } from './entity.model';

export const selectEntities = state => state.entities;

export const selectEntityState = (entityName: string) => {
	return createSelector([selectEntities], entities => entities[entityName]);
};

export const selectEntityById = (target: EntityTarget) => {
	return createSelector(
		[selectEntityState(target.entityRepr.entityName)],
		entityState => entityState.byId[target.entityId]
	);
};

// returns multiples entities given an array of ids.
export const selectMultipleById = (entityRepr: EntityRepresentation, ids: Array<string>) => {
	return createSelector([selectEntityState(entityRepr.entityName)], entityState => {
		return ids.map(id => entityState.byId[id]);
	});
};

// returns all entities of a given repr in an array
export const selectEntityArray = (entityRepr: EntityRepresentation) => {
	return createSelector([selectEntityState(entityRepr.entityName)], entityState => {
		return entityState.ids.map(id => entityState.byId[id]);
	});
};

// same as above but with a name
export const selectEntityArrayByName = (entityName: string) => {
	return createSelector([selectEntityState(entityName)], entityState => {
		return entityState.ids.map(id => entityState.byId[id]);
	});
};

// select product count of an entity
export const selectEntityProductCount = (entityRepr: EntityRepresentation) => {
	return createSelector([selectEntityState(entityRepr.entityName)], entityState => {
		return entityState.productCount || {};
	});
};

// select entities with a product count
export const selectRelevantEntities = (entityRepr: EntityRepresentation) => {
	return createSelector([selectEntityState(entityRepr.entityName)], state => {
		const count: { [id: string]: number } = state.productCount || {};
		return Object.entries(count)
			// we are only interested in entities which have a count
			.filter(([id, amount]) => state.byId[id])
			// map the id for the entity
			.map(([id, amount]) => ({ ...state.byId[id], productCount: amount }))
			.sort((a, b) => b.productCount - a.productCount);
	});
};
