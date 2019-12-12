import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';

export const config: TableConfig = {
	...defaultConfig,
	price: { name: 'price', translationKey: 'price', width: 100, sortProperty: 'price.value' },
	moq: { name: 'moq', translationKey: 'MOQ', width: 60, sortProperty: 'minimumOrderQuantity' },
	category: { name: 'category', translationKey: 'category', width: 90, sortProperty: 'category.name' },
};

