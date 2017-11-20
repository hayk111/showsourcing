
export interface Filter {
	target: FilterTarget;
	name: string;
	value: any;
}

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	TASKS_PAGE = 'tasksPage',
}

// for intellisens and compilation errors
export enum FilterTarget {
	suppliers = 'suppliers',
	events = 'events',
	categories = 'categories',
	tags = 'tags',
	projects = 'projects',
	price = 'price',
	rating = 'rating',
	productStatus = 'productStatus'
}

// formatted for api calls     
export const filterUrlMap  = {};
filterUrlMap[FilterTarget.categories] = 'category';
filterUrlMap[FilterTarget.productStatus] = 'status';
filterUrlMap[FilterTarget.price] = 'price';
filterUrlMap[FilterTarget.rating] = 'rating';

export interface FilterGroup {
	targets: Array<FilterTarget>;
	filters: Array<Filter>
}

export interface AppFilters {
	[key: string]: FilterGroup;
}

