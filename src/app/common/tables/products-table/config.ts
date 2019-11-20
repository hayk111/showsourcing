import { TableConfig } from '~core/list-page';

export const bigTableConfig: TableConfig = {
	// start usual suspsects
	logo: { name: 'logo', translationKey: '', width: 44, sortable: false },
	preview: { name: 'preview', translationKey: '', width: 84, sortable: false },
	name: { name: 'name', translationKey: 'name', width: 190, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 190, sortable: false },
	favorite: { name: 'favorite', translationKey: 'FAV', width: 50, sortProperty: 'favorite' },
	rating: { name: 'rating', translationKey: 'rating', width: 70, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 100, sortProperty: 'createdBy.firstName' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 152, sortProperty: 'assignee.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 100, sortProperty: 'creationDate' },
	status: { name: 'status', translationKey: 'status', width: 140, sortProperty: 'status.step' },
	// end usual suspsects
	price: { name: 'price', translationKey: 'price', width: 100, sortProperty: 'price.value' },
	moq: { name: 'moq', translationKey: 'moq', width: 60, sortProperty: 'minimumOrderQuantity' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 210, sortProperty: 'supplier.id' },
	category: { name: 'category', translationKey: 'category', width: 90, sortProperty: 'category.name' },
};

export const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 320, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 165, sortProperty: 'status.step' },
};
