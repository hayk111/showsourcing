import { defaultConfig } from '../default-columns/default-config';
import { TableConfig } from '../entity-table.component';


export const config: TableConfig = {
	...defaultConfig,
	country: { name: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { name: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	categories: { name: 'categories', translationKey: 'categories', width: 190, sortable: false },
};

