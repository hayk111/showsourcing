import { TableConfig } from '~core/list-page';


export const defaultConfig: TableConfig = {
	logo: { name: 'logo', translationKey: '', width: 36, sortable: false, fixedWidth: true },
	preview: { name: 'preview', translationKey: '', width: 84, sortable: false },
	name: { name: 'name', translationKey: 'name', width: 190, sortable: true },
	reference: { name: 'reference', translationKey: 'reference', width: 190, sortable: false },
	favorite: { name: 'favorite', translationKey: 'FAV', width: 50, sortProperty: 'favorite' },
	rating: { name: 'rating', translationKey: 'rating', width: 70, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 100, sortProperty: 'createdBy.firstName' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 152, sortProperty: 'assignee.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 120, sortProperty: 'creationDate' },
	status: { name: 'status', translationKey: 'status', width: 140, sortProperty: 'status.step' },
	productCount: { name: 'productCount', translationKey: 'products', width: 72, sortProperty: 'productsLinked.count' },
	taskCount: { name: 'taskCount', translationKey: 'tasks', width: 72, sortProperty: 'tasksLinked.count' },
	sampleCount: { name: 'sampleCount', translationKey: 'samples', width: 72, sortProperty: 'samplesLinked.count' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 210, sortProperty: 'supplier.id' },
	product: { name: 'product', translationKey: 'product', width: 210, sortProperty: 'product.id' },
};

