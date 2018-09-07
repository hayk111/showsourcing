import { ERM } from '~models';

/** Filters contain a type, a value and an optional entity
 * They represent the different filters that can be added from the
 * filter panel
*/
export class Filter {
	type: FilterType;
	value: any;
	entity?: any;
	constructor() { }
}

export enum FilterType {
	SUPPLIER = 'supplier',
	SUPPLIERS = 'suppliers',
	EVENT = 'event',
	EVENTS = 'events',
	CATEGORY = 'category',
	CATEGORIES = 'categories',
	TAG = 'tag',
	TAGS = 'tags',
	PROJECT = 'project',
	PROJECTS = 'projects',
	CREATED_BY = 'created by',
	PRODUCT_STATUS = 'status',
	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
	ASSIGNEE = 'assignee',
	PRODUCT = 'product'
}
