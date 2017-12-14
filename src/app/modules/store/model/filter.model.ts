import { Entity, EntityRepresentation } from '../utils/entities.utils';
import { CustomFieldsName } from '../reducer/custom-fields.reducer';
import { SupplierActions } from '../action/supplier.action';
import { EventActions } from '../action/event.action';
import { CategoryActions } from '../action/category.action';
import { TagActions } from '../action/tag.action';
import { ProjectActions } from '../action/project.action';
import { ProductActions } from '../action/product.action';
import { TaskActions } from '../action/task.action';


export interface Filter {
	entityRepr: EntityRepresentation;
	name: string;
	value: any;
}

export enum FilterGroupName {
	PRODUCT_PAGE = 'productsPage',
	TASKS_PAGE = 'tasksPage',
	SUPPLIER_PAGE = 'supplierPage',
	EVENTS_PAGE = 'eventsPage'
}



export interface AppFilters {
	[key: string]: Array<Filter>;
}

