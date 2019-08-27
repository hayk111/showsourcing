import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { ERM, Product } from '~models';
import { Sort } from '~shared/table/components/sort.interface';

interface ColumnConfig {
	title: string;
	width: number;
	sortProperty?: string;
}

interface TableConfig {
	[key: string]: ColumnConfig;
}

const columnConfig: TableConfig = {
	activities: { title: 'activities', width: 190 },
	assignee: { title: 'assignee', width: 50, sortProperty: 'assignee.firstName' },
	category: { title: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { title: 'created by', width: 140, sortProperty: 'createdBy.firstName' },
	creationDate: { title: 'creation date', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { title: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { title: 'price', width: 120, sortProperty: 'price.value' },
	projects: { title: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { title: 'reference', width: 190, sortProperty: 'reference' },
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
export class ProductsListViewComponent extends ListViewComponent<Product> implements OnInit {
	@Input() columns = [ 'reference', 'price', 'supplier', 'category', 'createdBy', 'activities', 'status', 'assignee' ];
	@Input() hasMenu = true;
	@Input() productPreview = true;
	@Input() isInProductSelectDlg = false;
	@Input() currentSort: Sort;
	@Input() tableWidth: number;
	@Output() setFavourite = new EventEmitter<Product>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	prodErm = ERM.PRODUCT;
	columnsConfig: ColumnConfig[] = [];

	constructor() {
		super();
	}

	ngOnInit() {
		this.columns.forEach(name => this.columnsConfig.push(columnConfig[name]));
	}
}
