export enum FilterType {
	ID = 'id',
	SUPPLIER = 'supplier',
	EVENT = 'event',
	CATEGORY = 'category',
	TAG = 'tag',
	TAGS = 'tags',
	PROJECT = 'project',
	PROJECTS = 'projects',
	CREATED_BY = 'createdBy',
	PRODUCT_STATUS_TYPE = 'status',
	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
	SEARCH = 'search',
	PREVENT_UPDATE = 'prevent_update'
}

export interface Filter {
	type: FilterType;
	value: any;
	raw?: string;
}
// the key here is actually a FilterGroupName
export interface FilterGroup {
	filters: Array<Filter>;
	// so we can do group.byType.get('supplier').has('id-88');
	byType: Map<FilterType, Map<any, Filter>>;
}

