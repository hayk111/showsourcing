import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { ERM, Product } from '~models';


const tableConfig: TableConfig = {
	activities: { title: 'activities', width: 190 },
	assignee: { title: 'assignee', width: 50, sortProperty: 'assignee.firstName' },
	category: { title: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { title: 'created by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'creation date', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { title: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { title: 'price', width: 120, sortProperty: 'price.value' },
	projects: { title: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { title: 'reference', width: 247, sortProperty: 'reference' },
	status: { title: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { title: 'supplier', width: 190, sortProperty: 'supplier.id' },
};

@Component({
	selector: 'products-list-view-app',
	templateUrl: './products-list-view.component.html',
	styleUrls: [
		'./products-list-view.component.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListViewComponent extends ListViewComponent<Product> {
	columns = [ 'reference', 'price', 'supplier', 'category', 'createdBy', 'activities', 'status', 'assignee' ];
	tableConfig = tableConfig;
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
