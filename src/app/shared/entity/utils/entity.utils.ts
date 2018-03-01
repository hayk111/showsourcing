import { Entity, EntityState } from "../models";

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: any, entities: Array<any> | any) {
	const ids = [...state.ids];
	const byId = { ...state.byId };
	// if we didn't receive an array let's just create one. We could create an error too.
	if (!Array.isArray(entities)) {
		entities = [entities];
	}
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
	});
	return {
		pending: false,
		byId,
		ids
	};
}

export function replaceEntity(state: any, old: Entity, replacing: Entity) {
	const oldId = old.id;
	const replacingId = replacing.id;
	const oldIdIndex = state.ids.indexOf(old.id);
	// if index found replace id in ids and Enitity in byId
	if (~oldIdIndex) {
		const ids = [...state.ids];
		const byId = { ...state.byId };
		ids[oldIdIndex] = replacing.id;
		delete byId[oldId];
		byId[replacing.id] = replacing;
		return {
			...state,
			ids,
			byId
		};
	}
	// if not found do nothing
	return state;
}

export const entityStateToArray = (entityState: EntityState<any>): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

export function copyById(state, id, additionalProps?: any) {
	return {
		...state,
		byId: {
			...state.byId,
			[id]: {
				...state.byId[id],
				...additionalProps
			}
		}
	};
}

export function removeEntity(state, id) {
	const ids = [...state.ids];
	const index = ids.indexOf(id);
	ids.splice(index, 1);

	const byId = { ...state.byId };
	delete byId[id];
	return {
		...state,
		byId,
		ids
	};
}
