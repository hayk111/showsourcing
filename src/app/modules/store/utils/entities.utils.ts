import { uuid } from './uuid.utils';

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

export class Entity {
	id: string;
	name: string;
	createdByUserId?: string;
	creationDate?: number;

	constructor(userId: string) {
		this.id = uuid();
		this.creationDate = Date.now();
		this.createdByUserId = userId;
	}
}

export class EntityRepresentation  {
	actions: any;
	constructor(public entityName: string,
							public urlName?: string,
							public displayName?: string,
							public descriptorName?: string) {
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
	teams: new EntityRepresentation('teams'),

	taskTypes: new EntityRepresentation('taskTypes'),
	taskStatuses: new EntityRepresentation('tasksStatus'),


	productStatus: new EntityRepresentation('productStatus', 'status', 'status'),
	currencies: new EntityRepresentation('currencies'),
	countries: new EntityRepresentation('countries'),
	teamMembers: new EntityRepresentation('teamMembers'),
	comments: new EntityRepresentation('comments'),
	files: new EntityRepresentation('files'),
	images: new EntityRepresentation('images'),
	customFields: new EntityRepresentation('customFields')
};

export interface EntityTarget {
	entityId?: string;
	entityRepr: EntityRepresentation;
}

// since the response we receive is an array we have to loop
// through every thing in order to normalize our data.
// https://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
export function addEntities(state: any, entities: Array<any> | any) {
	const ids = [...state.ids];
	const byId = { ...state.byId };
	// if we didn't receive an array let's just create one. We could create an error too.
	if (!Array.isArray(entities)){
		entities = [ entities ];
	}
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
