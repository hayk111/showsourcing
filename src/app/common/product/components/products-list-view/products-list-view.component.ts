import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { ERM, Product } from '~models';
import { Sort } from '~shared/table/components/sort.interface';


const tableConfig: TableConfig = {
	activities: { title: 'activities', translationKey: 'activities', width: 190 },
	assignee: { title: 'assignee', translationKey: 'assignee', width: 50, sortProperty: 'assignee.firstName' },
	category: { title: 'category', translationKey: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { title: 'created by', translationKey: 'created-by', width: 140, sortProperty: 'createdBy.firstName' },
	creationDate: { title: 'creation date', translationKey: 'creation-date', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', translationKey: '', width: 50, sortProperty: 'favorite' },
	moq: { title: 'moq', translationKey: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { title: 'price', translationKey: 'price', width: 120, sortProperty: 'price.value' },
	projects: { title: 'projects', translationKey: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { title: 'reference', translationKey: 'reference', width: 190, sortProperty: 'reference' },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { title: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.id' },
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
