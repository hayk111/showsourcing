import { Entity, EntityState } from '~entity/store/entity.model';
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

export function createEntity(state, entity: Entity) {
	return {
		...state,
		byId: {
			...state.byId,
			[entity.id]: entity
		},
		ids: [entity.id, ...state.ids]
	};
}

// replace mutliple entities
export function replaceEntities(state, replacingArr: Array<Entity>) {
	const byId = { ...state.byId };
	// removing from byId
	replacingArr.forEach(replacing => {
		byId[replacing.id] = replacing;
	});
	return {
		...state,
		byId
	};
}

// replace one
export function replaceEntity(state: any, replacing: Entity) {
	return {
		...state,
		byId: {
			...state.byId,
			[replacing.id]: replacing
		}
	};
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

