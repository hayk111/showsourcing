import { Typename } from '~core/erm3/typename.type';
import { FilterType } from './filter-type.enum';

export const bridgeFiltersConfig: Partial<Record<
	Typename,
	Partial<Record<FilterType, { bridgeTypename; searchProp; resultProp }>>
>> = {
	Product: {
		[FilterType.TAG]: {
			bridgeTypename: 'ProductTag',
			searchProp: 'tag',
			resultProp: 'product',
		},
		[FilterType.PROJECT]: {
			bridgeTypename: 'ProjectProduct',
			searchProp: 'project',
			resultProp: 'product',
		},
	},
};
