import { EntityRepresentation, Entity, ERM, Currency } from '~entity';

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage'
}

export interface Filter {
	type: string;
	value: any;
}
// the key here is actually a FilterGroupName
export interface AppFilters {
	[key: string]: Array<Filter>;
}
