import { TableConfig } from '~core/list-page';

export const bigTableConfig: TableConfig = {
	name: { name: 'icon name', translationKey: 'name', width: 190, sortProperty: 'name' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	product: { name: 'product', translationKey: 'product', width: 190, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.name' },
	comments: { name: 'comments', translationKey: 'comments', width: 140 },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	type: { name: 'type', translationKey: 'type', width: 140, sortProperty: 'type' },
	activities: { name: 'activities', translationKey: 'activities', width: 250, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
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
