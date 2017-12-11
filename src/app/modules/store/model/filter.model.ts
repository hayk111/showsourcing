import { Entity } from '../utils/entities.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/tag.action';
import { ProjectActions } from '../action/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


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


export interface AppFilters {
	[key: string]: Array<Filter>;
}

