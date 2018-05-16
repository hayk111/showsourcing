import { EntityRepresentation, Entity, ERM, Currency } from '~app/entity';

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	SUPPLIERS_PAGE = 'suppliersPage'
}

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
}
// the key here is actually a FilterGroupName
export interface AppFilters {
	[key: string]: Array<Filter>;
}

