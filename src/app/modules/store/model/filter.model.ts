import { Entity } from '../utils/entities.utils';


export interface Filter {
	entityRepr: EntityRepresentation;
	name: string;
	value: any;
}

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	TASKS_PAGE = 'tasksPage',
	SUPPLIER_PAGE = 'supplierPage',
	EVENTS_PAGE = 'eventsPage'
}


// PARAMS: urlName: formatted for api calls only need to put those wich don't transform by just removing the last char
// suppliers for example is not there because supplier (without the s) is the right format.
export class EntityRepresentation  {
	constructor(public entityName: string,
							public isEntity: boolean = false,
							public urlName?: string,
							public displayName?: string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
	}
}

export const entityRepresentationMap = {
	suppliers: new EntityRepresentation('suppliers', true),
	events: new EntityRepresentation('events', true),
	categories: new EntityRepresentation('categories', true, 'category'),
	tags: new EntityRepresentation('tags', true),
	projects: new EntityRepresentation('projects', true),
	product: new EntityRepresentation('products', true),
	productStatus: new EntityRepresentation('productStatus', true, 'status', 'status'),
	// non real entities, used as is for convenience
	prices: new EntityRepresentation('prices'),
	minPrices: new EntityRepresentation('minPrices'),
	maxPrices: new EntityRepresentation('maxPrices'),
	ratings: new EntityRepresentation('ratings'),
	withArchived: new EntityRepresentation('withArchived', false, 'withArchived', 'with archived'),
	tasksStatus: new EntityRepresentation('tasksStatus', true, 'taskStatus', 'status'),
	tasksTypes: new EntityRepresentation('tasksType', true, 'taskType', 'type'),
	name: new EntityRepresentation('name'),
	sortByProduct: new EntityRepresentation('sortByProduct', false, 'sort', 'sort by'),
	search: new EntityRepresentation('search', false, 'search')
};


export interface AppFilters {
	[key: string]: Array<Filter>;
}

