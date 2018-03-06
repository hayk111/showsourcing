import { uuid } from '~utils';

// interfacing the above initialState
export interface EntityState<G extends Entity> {
	pending: boolean;
	byId: { [key: string]: G };
	ids: Array<string>;
}

// default initial state in store for an entity
export const entityInitialState: EntityState<any> = {
	pending: true,
	byId: {},
	ids: [],
};

export interface ExtendedEntityState<G extends Entity> extends EntityState<G> {
	productsCount: Map<String, Number>;
}

// default initial state in store for an entity
export const extentedEntityInitialState: ExtendedEntityState<any> = {
	pending: true,
	byId: {},
	ids: [],
	productsCount: new Map(),
};

// represents an entity in the store
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

// helper class that represent entity in the store, their display names, and url name and any metadata we might need.
export class EntityRepresentation {
	actions: any;
	constructor(
		public entityName: string,
		public urlName?: string,
		public displayName?: string,
		public descriptorName?: string
	) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
		this.descriptorName = descriptorName || entityName + 'CFDef';
	}
}

// Helper map, exported as ERM below.
const entityRepresentationMap = {
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
	currencies: new EntityRepresentation('currencies', 'currency'),
	countries: new EntityRepresentation('countries', 'country'),
	teamMembers: new EntityRepresentation('teamMembers'),
	comments: new EntityRepresentation('comments'),
	files: new EntityRepresentation('files'),
	images: new EntityRepresentation('images'),
	customFields: new EntityRepresentation('customFields', 'customFields'),
	user: new EntityRepresentation('user'),
};

export const ERM = entityRepresentationMap;

// a target entity is represented with an id and a type (entityRepr).
export interface EntityTarget {
	entityId?: string;
	entityRepr: EntityRepresentation;
}
