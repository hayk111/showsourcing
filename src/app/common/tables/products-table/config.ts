import { defaultConfig } from '../default-columns/default-config';
import { TableConfig } from '../entity-table.component';

export const config: TableConfig = {
	...defaultConfig,
	price: { name: 'price', translationKey: 'price', width: 200, sortProperty: 'propertiesMap.price.value' },
	moq: { name: 'moq', translationKey: 'MOQ', width: 120, sortProperty: 'propertiesMap.price.minimumOrderQuantity' },
	category: { name: 'category', translationKey: 'category', width: 210, sortProperty: 'category.value' },
};

