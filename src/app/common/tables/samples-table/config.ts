import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';

export const bigTableConfig: TableConfig = {
	...defaultConfig,
};

export const mediumTableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	reference: { name: 'reference', translationKey: 'reference', width: 60, sortProperty: 'reference' },
	referenceName: { name: 'reference name', translationKey: 'reference', width: 160, sortable: false },
	product: { name: 'product', translationKey: 'product', width: 180, sortProperty: 'product.name' },
	status: { name: 'status', translationKey: 'status', width: 110, sortProperty: 'status.step' },
	statusCreationDate: { name: 'status creation date', translationKey: 'status', width: 240, sortable: false },
};

export const smallTableConfig: TableConfig = {
	name: { name: 'icon name', translationKey: 'name', width: 160, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 130, sortProperty: 'status.step' },
};
