import { ERM } from '~models';

/** Filters contain a type, a value and an optional entity
 * They represent the different filters that can be added from the
 * filter panel
*/
export class Filter {
	type: FilterType;
	value: any;
	entity?: any;
	constructor() { }
}

/** when a filter type is plural you can select many of them */
export class FilterType {
	static readonly SUPPLIER = 'supplier';
	static readonly SUPPLIERS = 'suppliers';

	static readonly EVENT = 'event';
	static readonly EVENTS = 'events';

	static readonly CATEGORY = 'category';
	static readonly CATEGORIES = 'categories';

	static readonly TAG = 'tag';
	static readonly TAGS = 'tags';

	static readonly PROJECT = 'project';
	static readonly PROJECTS = 'projects';

	static readonly CREATED_BY = 'createdBy';
	static readonly PRODUCT_STATUS = 'status';
	static readonly FAVORITE = 'favorite';
	static readonly ARCHIVED = 'archived';
}
