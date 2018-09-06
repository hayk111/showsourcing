
/** Filters contain a type, a value and a displayName
 * They represent the different filters that can be added from the
 * filter panel
*/
export interface Filter {
	type?: FilterType | string;
	comparator?: string;
	value?: any;
	entity?: any;
	raw?: string;
	fields?: string[];
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
	CREATED_BY = 'createdBy',
	PRODUCT_STATUS = 'status',
	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
	SEARCH = 'search',
}
