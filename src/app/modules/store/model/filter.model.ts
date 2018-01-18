import { Entity, entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/tag.action';
import { ProjectActions } from '../action/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	TASKS_PAGE = 'tasksPage',
	SUPPLIER_PAGE = 'supplierPage',
	EVENTS_PAGE = 'eventsPage'
}

// the key here is actually a FilterGroupName
export interface AppFilters {
	[key: string]: Array<Filter>;
}


// represent a specific filter
export interface Filter {
	value: any;
	displayName: string;
	isInstance: (filterClass: FilterClass) => boolean;
	toUrlParam: () => string;
	filter: (entity: any) => boolean;
}

// represent the FilterClass
export interface FilterClass {
	filterName: string;
	new (...args: any[]): Filter;
}


export abstract class BaseFilter {
	static readonly filterName: string = 'Unnamed';
	value: any;

	get displayName() {
		return `${(this.constructor as FilterClass).filterName}: ${this.value}`;
	}

	isInstance(filterClass: FilterClass): boolean {
		return this instanceof filterClass;
	}

	toUrlParam() {
		return `${(this.constructor as FilterClass).filterName}=${this.value}`;
	}

}

export abstract class FilterEntity extends BaseFilter {
	public static readonly isForEntity = true;

	constructor(public value: string, public entityRepr: EntityRepresentation) {
		super();
	}

	toUrlParam() {
		return `${this.entityRepr.urlName}=${this.value}`;
	}

	get displayName() {
		return `${this.entityRepr.displayName}: ${this.value}`;
	}

	filter(entity: Entity): boolean {
		return this.value === entity.id;
	}

}

export class FilterSupplier extends FilterEntity implements Filter {
	static readonly filterName = 'supplier';
	static getEntityRepr() { return entityRepresentationMap.suppliers; }
}

export class FilterCategory extends FilterEntity implements Filter {
	static readonly filterName = 'category';
	static getEntityRepr() { return entityRepresentationMap.categories; }
}

export class FilterEvent extends FilterEntity implements Filter {
	static readonly filterName = 'event';
	static getEntityRepr() { return entityRepresentationMap.events; }
}

export class FilterTags extends FilterEntity implements Filter {
	static readonly filterName = 'tag';
	static getEntityRepr() { return entityRepresentationMap.tags; }
}

export class FilterProjects extends FilterEntity implements Filter {
	static readonly filterName = 'project';
	static getEntityRepr() { return entityRepresentationMap.projects; }
}

export class FilterStatus extends FilterEntity implements Filter {
	static readonly filterName = 'status';
	static getEntityRepr() { return entityRepresentationMap.productStatus; }
}

// export class FilterPrice implements Filter {
// 	filterName = 'price';
// 	value: any;
// 	displayName: string;
// 	toUrlParam: () => string;
// 	filter: (entity: any) => boolean;
// }

// export class FilterRating implements Filter {
// 	filterName = 'rating';
// 	value: any;
// 	displayName: string;
// 	toUrlParam: () => string;
// 	filter: (entity: any) => boolean;
// 	isInstance(filter: Filter) {
// 		return filter instanceof FilterRating;
// 	}
// }

// export class FilterSort implements Filter {
// 	// urlName is used when we convert the filter to a
// 	// back end call
// 	public filterName = 'sort';
// 	constructor(public value: any, public order: 'asc' | 'desc') { }

// 	toUrlParam() {
// 		return `sort=${this.value}&sortOrder=${this.order}`;
// 	}

// 	get displayName() {
// 		return `Sort by: ${this.value}`;
// 	}

// 	filter(entity: any) {
// 		// in the case of the sort filter we never
// 		// actually filter items.
// 		return true;
// 	}
// }



