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
}

export class EntityRepresentation  {
	constructor(public actionType: any,
							public entityName: string,
							public isEntity: boolean = false,
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
	suppliers: new EntityRepresentation(SupplierActions, 'suppliers', true),
	events: new EntityRepresentation(EventActions, 'events', true),
	categories: new EntityRepresentation(CategoryActions, 'categories', true, 'category'),
	tags: new EntityRepresentation(TagActions, 'tags', true),
	projects: new EntityRepresentation(ProjectActions, 'projects', true),
	product: new EntityRepresentation(ProductActions, 'products', true),
	tasks: new EntityRepresentation(TaskActions, 'tasks', true),
	productStatus: new EntityRepresentation(null, 'productStatus', true, 'status', 'status'),
	currencies: new EntityRepresentation(null, 'currencies', true),
	// non real entities, used as is for convenience
	prices: new EntityRepresentation(null, 'prices'),
	minPrices: new EntityRepresentation(null, 'minPrices'),
	maxPrices: new EntityRepresentation(null, 'maxPrices'),
	ratings: new EntityRepresentation(null, 'ratings'),
	withArchived: new EntityRepresentation(null, 'withArchived', false, 'withArchived', 'with archived'),
	tasksStatus: new EntityRepresentation(null, 'tasksStatus', true, 'taskStatus', 'status'),
	tasksTypes: new EntityRepresentation(null, 'tasksType', true, 'taskType', 'type'),
	name: new EntityRepresentation(null, 'name'),
	sortByProduct: new EntityRepresentation(null, 'sortByProduct', false, 'sort', 'sort by'),
	search: new EntityRepresentation(null, 'search', false, 'search')
};


export interface EntityTarget {
	entityId: string;
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
				// returning deep copy of the product since it should
				// be inexpensive and it simplifies everything
				...deepCopy(state.byId[id]),
				...additionalProps
			}
		}
	};
}
