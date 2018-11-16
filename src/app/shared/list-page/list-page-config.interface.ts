import { FilterList } from '~shared/filters';
import { EntityMetadata } from '~models';


export interface ListPageDataConfig {

	/** main global service used */
	featureSrv: any;
	/** predicate that will be used at the start for filtering */
	initialPredicate?: string;
	/** property we sort by on first query */
	initialSortBy?: string;
	/** filters coming from the filter panel if any. */
	filterList?: FilterList;
	/** dialog to edit an item in the list.. */
	editDlgComponent?: any;
	createDlgComponent?: any;
	/** searched fields when making search */
	searchedFields: string[];

}
