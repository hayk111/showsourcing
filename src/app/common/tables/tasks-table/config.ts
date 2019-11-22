import { TableConfig } from '~core/list-page';
import { defaultConfig } from '../default-columns/default-config';

export const bigTableConfig: TableConfig = {
	...defaultConfig,
};

export const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 590, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 80, sortProperty: 'status.step', sortable: false },
};

export const smallTableConfig: TableConfig = {
	done: { name: 'done', translationKey: 'done', width: 50, sortable: false },
	name: { name: 'name assignee', translationKey: 'name', width: 240, sortProperty: 'name' },
	dueDate: { name: 'due date small', translationKey: 'due-date', width: 80, sortProperty: 'dueDate' },
};

export const mediumSmallTableConfig: TableConfig = {
	name: { name: 'small done name', translationKey: 'name', width: 240, sortProperty: 'name' },
	assigneeDueDate: { name: 'assignee due date', translationKey: '', width: 180, sortable: false },
};
