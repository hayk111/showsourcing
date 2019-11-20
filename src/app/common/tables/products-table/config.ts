import { TableConfig } from '~core/list-page';

export const bigTableConfig: TableConfig = {
	logo: { name: 'logo', translationKey: '', width: 56, sortable: false },
	preview: { name: 'preview', translationKey: '', width: 190, sortable: false },
	name: { name: 'name', translationKey: 'name', width: 190, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 190, sortable: false },
	rating: { name: 'rating', translationKey: 'rating', width: 190, sortable: false },

	activities: { name: 'activities', translationKey: 'activities', width: 190, sortable: false },
	category: { name: 'category', translationKey: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	favorite: { name: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { name: 'moq', translationKey: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { name: 'price', translationKey: 'price', width: 170, sortProperty: 'price.value' },
	projects: { name: 'projects', translationKey: 'projects', width: 190, sortProperty: 'creationDate' },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.id' },
};

export const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 320, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 165, sortProperty: 'status.step' },
};
