import { FilterList, Filter } from '~shared/filters';
import { EntityMetadata } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';


export interface ListPageDataConfig {

	/** main global service used */
	entitySrv: any;
	/** property we sort by on first query */
	selectParams?: SelectParamsConfig;
	/** filters coming from the filter panel if any. */
	filterList?: FilterList;
	/** searched fields when making search */
	searchedFields?: string[];
	initialFilters?: Filter[];

	/** dialog to edit an item in the list.. */
	editDlgComponent?: any;
	createDlgComponent?: any;
}
