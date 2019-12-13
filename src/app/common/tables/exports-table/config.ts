import { TableConfig } from '../entity-table.component';
import { defaultConfig } from '../default-columns/default-config';


export const config: TableConfig = {
	...defaultConfig,
	createdBy: { name: 'createdBy', translationKey: 'generated-by', width: 152, sortProperty: 'createdBy.firstName' },
	fileName: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'documentUrl' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status' },
	download: { name: 'download', translationKey: 'download', width: 100, sortable: false },
};
