import { uuid } from '~utils';

// interfacing the above initialState
export interface EntityState<G extends Entity> {
	pending: boolean;
	byId: { [id: string]: G };
	ids: Array<string>;
	focussed?: string;
	selected?: Array<string>;
}

// default initial state in store for an entity
export const entityInitialState: EntityState<any> = {
	pending: true,
	byId: {},
	ids: [],
	focussed: null,
	selected: [],
};

// represents an entity in the store
export class Entity {
	id: string;
	name?: string;
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
		public singularName?: string,
		public pluralName?: string
	) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
	}
}

// TODO: singularize every entity
// Helper map, exported as ERM below.
const entityRepresentationMap = {
	supplier: new EntityRepresentation('supplier'),
	event: new EntityRepresentation('event'),
	category: new EntityRepresentation('category'),
	tag: new EntityRepresentation('tag'),
	project: new EntityRepresentation('project'),
	product: new EntityRepresentation('product'),
	task: new EntityRepresentation('task'),
	team: new EntityRepresentation('team'),

	taskType: new EntityRepresentation('taskType'),
	taskStatus: new EntityRepresentation('tasksStatus', 'task-status', 'status'),
	supplierStatus: new EntityRepresentation('supplierStatus', 'supplier-status', 'status'),
	productStatus: new EntityRepresentation('productStatus', 'product-status', 'status'),
	currency: new EntityRepresentation('currency'),
	country: new EntityRepresentation('country'),
	incoTerm: new EntityRepresentation('incoTerm', 'incoTerms'),
	harbour: new EntityRepresentation('harbour', 'harbours'),
	teamMember: new EntityRepresentation('teamMember'),
	comment: new EntityRepresentation('comment'),
	file: new EntityRepresentation('file'),
	image: new EntityRepresentation('image'),
	customField: new EntityRepresentation('customField', 'customFields'),
	user: new EntityRepresentation('user'),
	contact: new EntityRepresentation('contact'),
};

export const ERM = entityRepresentationMap;

// a target entity is represented with an id and a type (entityRepr).
export interface EntityTarget {
	entityId?: string;
	entityRepr: EntityRepresentation;
}
