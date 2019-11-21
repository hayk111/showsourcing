import { TableConfig } from '~core/list-page';

export const bigTableConfig: TableConfig = {
	done: { name: 'done', translationKey: '', width: 50, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 80, sortProperty: 'reference' },
	name: { name: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 160, sortProperty: 'supplier.name' },
	dueDate: { name: 'due date', translationKey: 'due-date', width: 110, sortProperty: 'dueDate' },
	assignee: { name: 'assigned to', translationKey: 'assigned-to', width: 160, sortProperty: 'assignee.firstName' },
	status: { name: 'status', translationKey: 'status', width: 85, sortProperty: 'status.step', sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 160, sortProperty: 'createdBy.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 160, sortProperty: 'creationDate' },
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
