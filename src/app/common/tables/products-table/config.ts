import { defaultConfig } from '../default-columns/default-config';
import { TableConfig } from '../entity-table.component';

export const config: TableConfig = {
	...defaultConfig,
	price: { name: 'price', translationKey: 'price', width: 180, sortProperty: 'price.value' },
	moq: { name: 'moq', translationKey: 'MOQ', width: 120, sortProperty: 'price.minimumOrderQuantity' },
	category: { name: 'category', translationKey: 'category', width: 210, sortProperty: 'category.name' },
};

