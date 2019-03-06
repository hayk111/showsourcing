import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { Filter, FilterList } from '~shared/filters';
import { Client } from '~core/apollo/services/apollo-client-names.const';


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
	client?: Client;
}
