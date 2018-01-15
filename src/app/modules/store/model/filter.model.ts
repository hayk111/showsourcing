import { Entity, entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';
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
	private _displayedFilters: Array<FilterRepresentation>;

	constructor(public entityName: string,
		public hasCustomPanel: boolean,
		public urlName?: string,
		public displayName?: string) {
		// for plurals
		this.urlName = urlName || entityName.slice(0, -1);
		this.displayName = displayName || entityName;
	}

	// this is used because some filters display other filters.
	// For example the price filter actually uses the maxPrice and minPrice filter under the hood.
	get displayedFilters() {
		if (this._displayedFilters)
			return this._displayedFilters;
		else
			return [this];
	}


	set displayedFilters(v: Array<FilterRepresentation>) {
		this._displayedFilters = v;
	}

	static fromEntityRepr( repr: EntityRepresentation) {
		return new FilterRepresentation(repr.entityName, false, repr.urlName, repr.displayName);
	}

}

export const filterRepresentationMap: { [key: string]: FilterRepresentation} = {
	suppliers: FilterRepresentation.fromEntityRepr(entityRepresentationMap.suppliers),
	events: FilterRepresentation.fromEntityRepr(entityRepresentationMap.events),
	categories: FilterRepresentation.fromEntityRepr(entityRepresentationMap.categories),
	tags:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.tags),
	projects:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.projects),
	product:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.product),
	tasks:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.tasks),
	productStatus:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.productStatus),
	currencies:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.currencies),
	teamMembers:  FilterRepresentation.fromEntityRepr(entityRepresentationMap.teamMembers),
	// non real entities, used as is for convenience
	minPrices: new FilterRepresentation('minPrices', true),
	maxPrices: new FilterRepresentation('maxPrices', true),
	prices: new FilterRepresentation('prices', true, 'prices', 'prices'),
	ratings: new FilterRepresentation('ratings', true),
	withArchived: new FilterRepresentation('withArchived', true, 'withArchived', 'with archived'),
	tasksStatus: new FilterRepresentation('tasksStatus', true, 'taskStatus', 'status'),
	tasksTypes: new FilterRepresentation('tasksType', true, 'taskType', 'type'),
	name: new FilterRepresentation( 'name', true),
	sortByProduct: new FilterRepresentation('sortByProduct', true, 'sort', 'sort by'),
	search: new FilterRepresentation('search', true, 'search')
};

filterRepresentationMap.prices.displayedFilters = [
																										filterRepresentationMap.minPrices,
																										filterRepresentationMap.maxPrices
																									];

export interface AppFilters {
	[key: string]: Array<Filter>;
}

