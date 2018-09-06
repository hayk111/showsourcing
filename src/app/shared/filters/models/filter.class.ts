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
	PRODUCT_STATUS_TYPE = 'status',
	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
	ASSIGNEE = 'assignee',
	PRODUCT = 'product'
}

export interface Filter {
	type?: FilterType | string;
	comparator?: string;
	value?: any;
	entity?: any;
	raw?: string;
	fields?: string[];
}
