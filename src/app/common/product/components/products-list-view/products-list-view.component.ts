import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { ERM, Product } from '~models';
import { Sort } from '~shared/table/components/sort.interface';


const columnConfig = {
	'activities': { width: 190 },
	'assignee': { width: 50 },
	'category': { width: 190 },
	'created by': { width: 140 },
	'creation date': { width: 190 },
	'favorite': { width: 50 },
	'moq': { width: 120 },
	'price': { width: 120 },
	'projects': { width: 190 },
	'reference': { width: 190 },
	'status': { width: 190 },
	'supplier': { width: 190 },
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
	@Input() columns = [ 'reference', 'price', 'supplier', 'category', 'created by', 'activities', 'status', 'assignee' ];
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

	constructor() {
		super();
	}

	getWidth(columnName: string) {
		return columnConfig[columnName].width;
	}
}
