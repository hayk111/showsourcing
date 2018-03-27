import { Entity, EntityState } from '~entity';
import { Swap } from 'app/shared/entity/utils/index';
import { deepCopy } from '~app/app-root/utils';
import { Resolver } from '~app/app-root/utils/resolver.class';

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: any, entities: Array<Entity> | any) {
	const ids = [...state.ids];
	const byId = { ...state.byId };
	// if we didn't receive an array let's just create one. We could create an error too.
	if (!Array.isArray(entities)) {
		entities = [entities];
	}
	// We only push if entity is not already in the store
	entities.forEach(entity => {
		const id = entity.id;
		if (byId[id] === undefined) {
			ids.push(id);
		}
		byId[id] = entity;
	});

	return {
		...state,
		pending: false,
		byId,
		ids
	};
}

// replace mutliple entities
export function replaceEntities(state, swaps: Array<Swap>) {
	const oldIds = swaps.map(swap => swap.old.id);
	const replacings = swaps.map(swap => swap.replacing);
	const ids = [...state.ids];
	const byId = { ...state.byId };
	// removing from byId
	swaps.forEach(swap => {
		delete byId[swap.old.id];
		byId[swap.replacing.id] = swap.replacing;
		const oldIndex = ids.indexOf(swap.old.id);
		if (~oldIndex) {
			ids[oldIndex] = swap.replacing.id;
		}
	});
	return {
		...state,
		ids,
		byId
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
			byId
		};
	}
	// if not found do nothing
	return state;
}

export const entityStateToArray = (
	entityState: EntityState<any>
): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

export function updateOne(state, id, propName: string, value: any) {
	// deep copy because we might access nested properties
	let target = deepCopy(state.byId[id]);
	target = Resolver.patch(propName, target, value);

	return {
		...state,
		byId: {
			...state.byId,
			[id]: {
				...target
			}
		}
	};
}

export function removeEntities(state, entityIds: Array<any>) {
	const ids = [...state.ids.filter(o => !entityIds.includes(o))];
	const byId = { ...state.byId };
	entityIds.forEach(id => delete byId[id]);
	return {
		...state,
		byId,
		ids
	};
}

