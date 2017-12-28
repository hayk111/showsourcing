import { Entity, entityRepresentationMap } from '../utils/entities.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/tag.action';
import { ProjectActions } from '../action/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


export interface Filter {
	filterRepr: FilterRepresentation;
	name: string;
	value: any;
}

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	TASKS_PAGE = 'tasksPage',
	SUPPLIER_PAGE = 'supplierPage',
	EVENTS_PAGE = 'eventsPage'
}

export class FilterRepresentation {
	constructor(public entityName: string,
		public hasCustomPanel: boolean,
		public urlName?: string,
		public displayName?: string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
}
}

export const filterRepresentationMap: { [key: string]: FilterRepresentation} = {
	suppliers: entityRepresentationMap.suppliers as FilterRepresentation,
	events: entityRepresentationMap.events as FilterRepresentation,
	categories: entityRepresentationMap.categories as FilterRepresentation,
	tags: entityRepresentationMap.tags as FilterRepresentation,
	projects: entityRepresentationMap.projects as FilterRepresentation,
	product: entityRepresentationMap.product as FilterRepresentation,
	tasks: entityRepresentationMap.tasks as FilterRepresentation,
	productStatus: entityRepresentationMap.productStatus as FilterRepresentation,
	currencies: entityRepresentationMap.currencies as FilterRepresentation,
	teamMembers: entityRepresentationMap.teamMembers as FilterRepresentation,
	// non real entities, used as is for convenience
	prices: new FilterRepresentation('prices', true),
	minPrices: new FilterRepresentation('minPrices', true),
	maxPrices: new FilterRepresentation('maxPrices', true),
	ratings: new FilterRepresentation('ratings', true),
	withArchived: new FilterRepresentation('withArchived', true, 'withArchived', 'with archived'),
	tasksStatus: new FilterRepresentation('tasksStatus', true, 'taskStatus', 'status'),
	tasksTypes: new FilterRepresentation('tasksType', true, 'taskType', 'type'),
	name: new FilterRepresentation( 'name', true),
	sortByProduct: new FilterRepresentation('sortByProduct', true, 'sort', 'sort by'),
	search: new FilterRepresentation('search', true, 'search')
};

export interface AppFilters {
	[key: string]: Array<Filter>;
}

