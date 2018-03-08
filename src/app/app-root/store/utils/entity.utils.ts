import { Entity, EntityState } from '~entity';
import { Swap } from '~app/shared/entity/utils';

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
	// We only push if entity is not already in the store
	entities.forEach(entity => {
		if (byId[entity.id] === undefined) {
			ids.push(entity.id);
			byId[entity.id] = entity;
		}
	});

	return {
		...state,
		pending: false,
		byId,
		ids,
	};
}

// replace mutliple entities
export function replaceEntities(state, swaps: Array<Swap>) {
	const oldIds = swaps.map(swap => swap.old.id);
	const replacings = swaps.map(swap => swap.replacing);
	let ids = [...state.ids];
	const byId = { ...state.byId };
	// we remove the ids to be replaced from the array of ids
	ids = ids.filter(id => !oldIds.includes(id));
	oldIds.forEach(old => delete byId[old]);
	replacings.forEach(replacing => (byId[replacing.id] = replacing));
	return {
		...state,
		ids,
		byId,
	};
}

// replace one
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
			byId,
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
				...additionalProps,
			},
		},
	};
}

export function removeEntities(state, entityIds: Array<any>) {
	const ids = [...state.ids.filter(o => !entityIds.includes(o))];
	const byId = { ...state.byId };
	entityIds.forEach(id => delete byId[id]);
	return {
		...state,
		byId,
		ids,
	};
}
