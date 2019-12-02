import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';


export const bigTableConfig: TableConfig = {
	...defaultConfig,
	country: { name: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { name: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	categories: { name: 'categories', translationKey: 'categories', width: 190, sortable: false },
};

export const mediumTableConfig: TableConfig = {
	reference: { name: 'reference', translationKey: 'reference', width: 500, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status.step' },
};
