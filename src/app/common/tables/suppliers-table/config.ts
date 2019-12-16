import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';


export const config: TableConfig = {
	...defaultConfig,
	country: { name: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { name: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	categories: { name: 'categories', translationKey: 'categories', width: 190, sortable: false },
};

