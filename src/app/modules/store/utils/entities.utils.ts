import { deepCopy } from './deep-copy.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/target/tag.action';
import { ProjectActions } from '../action/target/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


export const entityInitialState: EntityState<any> = {
	pending: true,
	byId : {},
	ids: []
};

export interface EntityState<G extends Entity> {
	pending: boolean;
	byId: { [key: string]: G };
	ids: Array<string>;
}

export interface Entity {
	id: string | number;
	name?: string;
	// when selected in a filter
	checked?: boolean;
}

export class EntityRepresentation  {
	constructor(public entityName: string,
							public urlName?: string,
							public displayName?: string,
							public descriptorName?: CustomFieldsName | string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
		this.descriptorName = descriptorName || entityName + 'CFDef';
	}
}

export const entityRepresentationMap = {
	suppliers: new EntityRepresentation('suppliers'),
	events: new EntityRepresentation('events'),
	categories: new EntityRepresentation('categories', 'category'),
	tags: new EntityRepresentation('tags'),
	projects: new EntityRepresentation('projects'),
	product: new EntityRepresentation('products'),
	tasks: new EntityRepresentation('tasks'),
	productStatus: new EntityRepresentation('productStatus', 'status', 'status'),
	currencies: new EntityRepresentation('currencies'),
	teamMembers: new EntityRepresentation('teamMembers'),
};


export interface EntityTarget {
	entityId?: string;
	entityRepr: EntityRepresentation;
}

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: EntityState<any>, entities: Array<any>) {
	const ids = [...state.ids];
	const byId = { ...state.byId };
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
	});
	return {
		pending: false,
		byId,
		ids,
	};
}

export function removeEntities(state, idsToRemove: Array<string>) {
	let ids = [...state.ids];
	const byId = { ...state.byId };
	const length = ids.length;
	let index;
	for (let i = 0; i < length; i++) {
		// remove an id if it's found
		if (~ (index = idsToRemove.indexOf(ids[i]))) {
			delete byId[ids[i]];
			ids = ids.splice(i, 1);
			idsToRemove = idsToRemove.splice(index, 1);
			if (idsToRemove.length < 1)
				break;
		}
	}

	return {
		pending: false,
		byId,
		ids,
	};
}

// used when there is a pending entity ( new entity added with a fake id. Then we get the real id
// from the backend )
export function replaceEntity(state, id: string, replacing: Entity) {
	// a bit more performant than filter since we don't have to go through the whole array
	const index = state.ids.findIndex(idx => idx === id);
	const ids = state.ids.splice(index, 1);
	const byId = { ...state.byId };
	delete byId[id];
	return addEntities(state, [replacing]);
}

export const entityStateToArray = (entityState: EntityState<any>): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

// add property to entity in an immutable way
export function entityAddProp(state, id, additionalProps?: any) {
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

// used when an entity property has an array of ids
export function entityAddItemToArray(state, entityId: string, propName: string, idsToAdd: Array<string>) {
	let arr = [];
	if (state.byId[entityId] && state.byId[entityId][propName]) {
		arr = state.byId[entityId][propName];
	}

	arr = arr.concat(idsToAdd);
	entity.propName = entity.propName.concat(idsToAdd);
	return {
		...state,
		byId: {
			...state.byId,
			[entityId]: entity
		}
	};
}

// used when an entity property has an array of ids
export function removeIdFromEntityProp(state, entityId, propName, removedId) {
	const entity = { ...state.byId[entityId] };
	entity.propName = entity.propName.filter(idx => idx !== removedId);
	return {
		...state,
		byId: {
			...state.byId,
			[entityId]: entity
		}
	};
}

// used when an entity property has an array of ids
export function replaceIdFromEntityProp(state, entityId: string, replacingId: string, oldId: string) {
	const entity = { ...state.byId[entityId] };
	entity.propName = entity.propName.filter(idx => idx !== replacingId);
	return {
		...state,
		byId: {
			...state.byId,
			[entityId]: entity
		}
	};
}
