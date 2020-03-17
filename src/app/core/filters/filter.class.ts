import { FilterType } from './filter-type.enum';


/** Filters contain a type, a value and an optional entity
 * They represent the different filters that can be added from the
 * filter panel
 */
export class Filter {
	type: FilterType;
	value: any;
	equality ? = 'eq';
	displayValue ?: string;
	constructor() {}
}



