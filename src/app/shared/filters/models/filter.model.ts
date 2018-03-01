import { Entity, entityRepresentationMap, EntityRepresentation } from '~store/utils/entities.utils';
import { Currency } from '~store/model/entities/currency.model';

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	WORKFLOW_PAGE = 'workflowPage',
	TASKS_PAGE = 'tasksPage',
	SUPPLIER_PAGE = 'supplierPage',
	PROJECTS_PAGE = 'projectPage',
	EVENTS_PAGE = 'eventsPage'
}

// the key here is actually a FilterGroupName
export interface AppFilters {
	[key: string]: Array<Filter>;
}

// represent a specific filter
export interface Filter {
	value: any;
	displayValue: string;
	filterName: string;
	// using a function here because we need to compute the value
	// and for some reasons getters don't always work with ngrx-store-freeze
	displayName: () => string;
	toUrlParam: () => string;
	filter: (entity: any) => boolean;
	equals: (filter: Filter) => boolean;
}

// represent the Filter class
export interface FilterClass {
	filterName: string;
	new (...args: any[]): Filter;
}

export abstract class BaseFilter {
	static readonly filterName: string = 'Unnamed';
	displayValue: string;
	value: any;

	constructor() {}

	displayName() {
		return `${(this.constructor as any).filterName}: ${this.displayValue}`;
	}

	toUrlParam() {
		return `${(this.constructor as FilterClass).filterName}=${this.value}`;
	}

	get filterName() {
		return (this.constructor as FilterClass).filterName;
	}

	equals(filter: Filter) {
		return filter instanceof this.constructor && filter.value === this.value;
	}
}

// represent the Filter class
export interface FilterEntityClass extends FilterClass {
	getEntityRepr: () => EntityRepresentation;
	newInstance: (value, displayValue) => FilterEntity;
	new (value: string, displayValue: string, entityRepr: EntityRepresentation): FilterEntity;
}

export abstract class FilterEntity extends BaseFilter {
	public static readonly isForEntity = true;

	constructor(public value: string, public displayValue: string, public entityRepr: EntityRepresentation) {
		super();
	}

	static getEntityRepr() {
		throw Error('you should call getEntityRepr on a subclass of FilterEntity');
	}

	toUrlParam() {
		return `${this.entityRepr.urlName}=${this.value}`;
	}

	filter(entity: Entity): boolean {
		return this.value === entity.id;
	}
}

export class FilterSupplier extends FilterEntity implements Filter {
	static readonly filterName = 'supplier';
	static getEntityRepr() {
		return entityRepresentationMap.suppliers;
	}
	static newInstance(value, displayValue) {
		return new FilterSupplier(value, displayValue, FilterSupplier.getEntityRepr());
	}
}

export class FilterCategory extends FilterEntity implements Filter {
	static readonly filterName = 'category';
	static getEntityRepr() {
		return entityRepresentationMap.categories;
	}
	static newInstance(value, displayValue) {
		return new FilterCategory(value, displayValue, FilterCategory.getEntityRepr());
	}
}

export class FilterEvent extends FilterEntity implements Filter {
	static readonly filterName = 'event';
	static getEntityRepr() {
		return entityRepresentationMap.events;
	}
	static newInstance(value, displayValue) {
		return new FilterEvent(value, displayValue, FilterEvent.getEntityRepr());
	}
}

export class FilterTags extends FilterEntity implements Filter {
	static readonly filterName = 'tag';
	static getEntityRepr() {
		return entityRepresentationMap.tags;
	}
	static newInstance(value, displayValue) {
		return new FilterTags(value, displayValue, FilterTags.getEntityRepr());
	}
}

export class FilterProjects extends FilterEntity implements Filter {
	static readonly filterName = 'project';
	static getEntityRepr() {
		return entityRepresentationMap.projects;
	}
	static newInstance(value, displayValue) {
		return new FilterProjects(value, displayValue, FilterProjects.getEntityRepr());
	}
}

export class FilterStatus extends FilterEntity implements Filter {
	static readonly filterName = 'status';
	static getEntityRepr() {
		return entityRepresentationMap.productStatus;
	}
	static newInstance(value, displayValue) {
		return new FilterStatus(value, displayValue, FilterStatus.getEntityRepr());
	}
}

export class FilterSearch extends BaseFilter implements Filter {
	static readonly filterName = 'search';

	constructor(public value: string) {
		super();
	}

	filter(entity: Entity) {
		return entity.name.startsWith(this.value);
	}
}

export class FilterPrice extends BaseFilter implements Filter {
	static readonly filterName = 'price';
	value: any;
	displayValue = this.value;

	constructor(public currency: Currency, public min: number, public max: number) {
		super();
		// not really important...
		this.value = [min, max];
		this.displayValue = this.value;
	}

	toUrlParam() {
		let params = '';
		if (this.min) params += `minPrice=${this.min}&`;
		if (this.max) params += `maxPrice=${this.max}&`;
		params += `priceCurrency=${this.currency.id}`;
		return params;
	}

	// let's return something like 40 < price < 80
	displayName() {
		let name = '';

		if (this.min) name += `${this.min} <`;

		name += 'price';

		if (this.max) name += ` < ${this.max}`;
		return name;
	}

	filter(entity: any) {
		return entity.priceAmount > this.min && entity.priceAmount < this.max;
	}
}

export class FilterRating extends BaseFilter implements Filter {
	static readonly filterName = 'rating';
	constructor(public value: number) {
		super();
	}
	filter(entity: any) {
		return entity.rating === this.value;
	}
}

export class FilterSort extends BaseFilter implements Filter {
	// urlName is used when we convert the filter to a
	// back end call
	static readonly filterName = 'sort';

	constructor(public value: any, public order: 'ASC' | 'DESC') {
		super();
	}

	toUrlParam() {
		return `sort=${this.value}&sortOrder=${this.order}`;
	}

	displayName() {
		return `Sort by: ${this.value} ${this.order.toLowerCase()}`;
	}

	filter(entity: any) {
		// in the case of the sort filter we never
		// actually filter items.
		return true;
	}

	toString() {
		return '';
	}
}
