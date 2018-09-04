export enum FilterType {
	// when searching with a raw filter filter.value : 'supplier.id == "x"'
	RAW = 'raw',
	SEARCH = 'search',
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
}

export class Filter {
	type: 'string' | 'value' | 'date' = 'string';
	target: string;
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

// export class Filter {
// 	type: FilterType = FilterType.RAW;
// 	value: any;
// }

// export class FilterSearch extends Filter {
// 	type = FilterType.SEARCH;
// 	fields = ['name'];
// }

// export class FilterNestedEntity {
// 	type = FilterType.ENTITY;
// 	isList = true;
// 	filterOn = 'id';
// 	entity: string;
// }
