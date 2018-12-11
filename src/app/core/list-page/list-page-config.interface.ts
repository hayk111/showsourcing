import { FilterList, Filter } from '~shared/filters';
import { EntityMetadata } from '~models';
import { Sort } from '~shared/table/components/sort.interface';


export interface ListPageDataConfig {

	/** main global service used */
	entitySrv: any;
	/** predicate that will be used at the start for filtering */
	initialPredicate?: string;
	/** property we sort by on first query */
	currentSort?: Sort;
	/** filters coming from the filter panel if any. */
	filterList?: FilterList;
	/** dialog to edit an item in the list.. */
	editDlgComponent?: any;
	createDlgComponent?: any;
	/** searched fields when making search */
	searchedFields?: string[];
	initialFilters?: Filter[];
}
