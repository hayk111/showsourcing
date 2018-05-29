export enum FilterType {
	SUPPLIER = 'supplier',
	EVENT = 'event',
	CATEGORY = 'category',
	TAG = 'tag',
	PROJECT = 'project',
	CREATED_BY = 'createdBy',
	PRODUCT_STATUS = 'status',
	FAVORITE = 'favorite',
	ARCHIVED = 'archived',
	SEARCH = 'search'
}

export interface Filter {
	type: FilterType;
	value: any;
	raw: string;
}
// the key here is actually a FilterGroupName
export interface FilterGroup {
	filters: Array<Filter>;
	// so we can do group.byType.get('supplier').has('id-88');
	byType: Map<FilterType, Map<any, Filter>>;
}

