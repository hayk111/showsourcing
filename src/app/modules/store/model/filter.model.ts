import { Entity } from '../utils/entities.utils';


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
	prices = 'prices',
	minPrices = 'minPrices',
	maxPrices = 'maxPrices',
	ratings = 'ratings',
	productStatus = 'productStatus'
}

// formatted for api calls only need to put those wich don't transform by just removing the last char
// suppliers for example is not there because supplier (without the s) is the right format.
export const filterUrlMap  = {};
filterUrlMap[FilterTarget.categories] = 'category';
filterUrlMap[FilterTarget.productStatus] = 'status';

export const getUrlForTarget = (target: FilterTarget) => {
	return filterUrlMap[target] || target.slice(0, -1);
};

export interface FilterGroup {
	targets: Array<FilterTarget>;
	filters: Array<Filter>;
}

export interface AppFilters {
	[key: string]: FilterGroup;
}

