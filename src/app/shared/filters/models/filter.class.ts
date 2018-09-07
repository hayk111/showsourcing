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

/** when a filter type is plural you can select many of them */
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

	CREATED_BY = 'createdBy',
	PRODUCT_STATUS = 'status',
	SUPPLIER_STATUS = 'status',

	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
}
