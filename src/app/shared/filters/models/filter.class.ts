/** Filters contain a type, a value and an optional entity
 * They represent the different filters that can be added from the
 * filter panel
 */
export class Filter {
	type: FilterType;
	value: any;
	equality ? = 'eq';
	entity?: any;
	constructor() {}
}

/** when a filter type is plural you can select many of them
 * if a new filter is added, check to add the correspondong filter condition
 * on filter-list.class.ts
 */
export enum FilterType {
	ARCHIVED = 'archived',
	ASSIGNEE = 'assignee',
	CATEGORIES = 'categories',
	CATEGORY = 'category',
	CREATED_BY = 'createdBy',
	CUSTOM = 'custom',
	DELETED = 'deleted',
	DONE = 'done',
	DUE_DATE = 'dueDate',
	EVENT = 'event',
	EVENTS = 'events',
	FAVORITE = 'favorite',
	PRODUCT = 'product',
	PRODUCT_STATUS = 'status',
	PROJECT = 'project',
	PROJECTS = 'projects',
	SAMPLE_STATUS = 'status',
	SUPPLIER = 'supplier',
	SUPPLIERS = 'suppliers',
	SUPPLIER_STATUS = 'status',
	TAG = 'tag',
	TAGS = 'tags'
}
