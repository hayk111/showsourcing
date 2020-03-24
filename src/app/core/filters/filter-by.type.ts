import { FilterType } from './filter-type.enum';
import { Filter } from './filter.class';

/** so we can check if a filter type has a specific value, filterList.valuesByType.get(FilterType.SUPPLIER).has(id-10) */
export type ValuesByType = Map<FilterType, Set<any>>;
/** so we can display the filters for a given type */
export type FiltersByType = Map<FilterType, Filter[]>;
