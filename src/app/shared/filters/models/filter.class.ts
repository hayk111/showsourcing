export enum FilterType {
	ID = 'id',
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
	SEARCH = 'search',
}

export interface Filter {
	type?: FilterType | string;
	comparator?: string;
	value?: any;
	entity?: any;
	raw?: string;
	fields?: string[];
}
// the key here is actually a FilterGroupName
export interface FilterGroup {
	filters: Array<Filter>;
	// so we can do group.byType.get('supplier').has('id-88');
	byType: Map<FilterType, Map<any, Filter>>;
}
