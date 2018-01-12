import { deepCopy } from './deep-copy.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/tag.action';
import { ProjectActions } from '../action/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


export interface EntityState<G extends Entity> {
	pending: boolean;
	maxEntityCounter: number;
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
export function addEntities(state: any, entities: Array<any>) {
	const ids = [...state.ids];
	let maxEntityCounter = state.maxEntityCounter;
	const byId = { ...state.byId };
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
		// the counter is usually placed in either of those places
		let counter = entity.entityCounter;
		if (counter === undefined && entity.counter) {
			counter = entity.counters.entityCounter;
		}
		counter = 0;
		if (counter > maxEntityCounter) {
			maxEntityCounter = counter;
		}
	});
	return {
		pending: false,
		maxEntityCounter,
		byId,
		ids,
	};
}

// same but we don't care about the previous state
export function setEntities(entities: Array<any>) {
	const ids = [];
	const byId = {};
	let maxEntityCounter;
	entities.forEach(entity => {
		ids.push(entity.id);
		byId[entity.id] = entity;
		// the counter is usually placed in either of those places
		maxEntityCounter = entity.entityCounter || entity.counters.entityCounter;
	});
	return {
		pending: false,
		maxEntityCounter,
		byId,
		ids,
	};
}


export const entityStateToArray = (entityState: EntityState<any>): Array<any> => {
	const returned = [];
	entityState.ids.forEach(id => {
		returned.push(entityState.byId[id]);
	});
	return returned;
};

export const entityInitialState: EntityState<any> = {
	pending: true,
	maxEntityCounter: 0,
	byId : {},
	ids: []
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
