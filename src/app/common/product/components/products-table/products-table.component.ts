import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, Product } from '~models';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	activities: { name: 'activity', translationKey: 'activity', width: 190, sortable: false },
	category: { name: 'category', translationKey: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 140, sortProperty: 'creationDate' },
	creationDate: { name: 'creation date', translationKey: 'creation-date', width: 190, sortProperty: 'creationDate' },
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	favorite: { name: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { name: 'moq', translationKey: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { name: 'price', translationKey: 'price', width: 120, sortProperty: 'price.value' },
	projects: { name: 'projects', translationKey: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 247, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.id' },
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

	constructor(public translate: TranslateService) {
		super();
	}

}
