import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, Product } from '~models';


const tableConfig: TableConfig = {
	activities: { title: 'activity', width: 190, sortable: false },
	category: { title: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { title: 'created by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'creation date', width: 190, sortProperty: 'creationDate' },
	about: { title: 'about', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { title: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { title: 'price', width: 120, sortProperty: 'price.value' },
	projects: { title: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { title: 'reference', width: 247, sortProperty: 'reference' },
	status: { title: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { title: 'supplier', width: 190, sortProperty: 'supplier.id' },
};

@Component({
	selector: 'products-table-app',
	templateUrl: './products-table.component.html',
	styleUrls: [
		'./products-table.component.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent extends EntityTableComponent<Product> {
	columns = ['reference', 'price', 'supplier', 'category', 'createdBy', 'activities', 'status'];
	@Input() tableConfig = tableConfig;
	@Input() tableWidth: number;
	@Output() setFavourite = new EventEmitter<Product>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	prodErm = ERM.PRODUCT;

	constructor() {
		super();
	}

}
