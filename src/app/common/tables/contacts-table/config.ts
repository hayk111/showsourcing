import { defaultConfig } from '../default-columns/default-config';
import { TableConfig } from '../entity-table.component';


export const config: TableConfig = {
	...defaultConfig,
	name: { name: 'name', translationKey: 'name', width: 310, sortable: true, sortProperty: 'name' },
	email: { name: 'email', translationKey: 'email', width: 250, sortable: true, sortProperty: 'email' },
	jobTitle: { name: 'jobTitle', translationKey: 'function', width: 190, sortable: true, sortProperty: 'jobTitle' },
	phoneNumber: { name: 'phoneNumber', translationKey: 'phone', width: 170, sortable: true, sortProperty: 'phoneNumber' },
};
