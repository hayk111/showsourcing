import { TableConfig } from '../entity-table.component';


export const defaultConfig: TableConfig = {
	logo: { name: 'logo', translationKey: '', width: 36, sortable: false, fixedWidth: true },
	preview: { name: 'preview', translationKey: '', width: 84, sortable: false },
	name: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	reference: { name: 'reference', translationKey: 'reference', width: 72, sortProperty: 'reference' },
	email: { name: 'email', translationKey: 'email', width: 190, sortProperty: 'email' },
	favorite: { name: 'favorite', translationKey: 'FAV', width: 50, sortProperty: 'favorite' },
	rating: { name: 'rating', translationKey: 'rating', width: 100, sortable: false },
	createdBy: { name: 'createdBy', translationKey: 'created-by', width: 152, sortProperty: 'createdBy.firstName' },
	assignee: { name: 'assignee', translationKey: 'assigned-to', width: 152, sortProperty: 'assignee.firstName' },
	creationDate: { name: 'creationDate', translationKey: 'created-on', width: 120, sortProperty: 'creationDate' },
	status: { name: 'status', translationKey: 'status', width: 140, sortProperty: 'status.step' },
	productCount: { name: 'productCount', translationKey: 'products', width: 72, sortable: false },
	supplierCount: { name: 'supplierCount', translationKey: 'suppliers', width: 72, sortable: false },
	taskCount: { name: 'taskCount', translationKey: 'tasks', width: 72, sortable: false },
	sampleCount: { name: 'sampleCount', translationKey: 'samples', width: 72, sortable: false },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 210, sortProperty: 'supplier.name' },
	product: { name: 'product', translationKey: 'product', width: 210, sortProperty: 'product.id' },
	dueDate: { name: 'dueDate', translationKey: 'due-date', width: 200, sortProperty: 'dueDate' },
	done: { name: 'done', translationKey: 'done', width: 110, sortProperty: 'done' },
};

