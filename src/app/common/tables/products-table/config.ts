import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';

export const bigTableConfig: TableConfig = {
	...defaultConfig,
	price: { name: 'price', translationKey: 'price', width: 100, sortProperty: 'price.value' },
	moq: { name: 'moq', translationKey: 'MOQ', width: 60, sortProperty: 'minimumOrderQuantity' },
	category: { name: 'category', translationKey: 'category', width: 90, sortProperty: 'category.name' },
};

export const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 320, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 165, sortProperty: 'status.step' },
};
