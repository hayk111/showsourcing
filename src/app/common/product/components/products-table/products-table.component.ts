import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, Product } from '~models';
import { Color } from '~utils';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	activities: { title: 'activity', translationKey: 'activity', width: 190, sortable: false },
	category: { title: 'category', translationKey: 'category', width: 190, sortProperty: 'category.name' },
	createdBy: { title: 'created by', translationKey: 'created-by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'creation date', translationKey: 'creation-date', width: 190, sortProperty: 'creationDate' },
	about: { title: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	moq: { title: 'moq', translationKey: 'moq', width: 120, sortProperty: 'minimumOrderQuantity' },
	price: { title: 'price', translationKey: 'price', width: 120, sortProperty: 'price.value' },
	projects: { title: 'projects', translationKey: 'projects', width: 190, sortProperty: 'creationDate' },
	reference: { title: 'reference', translationKey: 'reference', width: 247, sortProperty: 'reference' },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { title: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.id' },
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
	@Input() hasVerticalScroll: boolean;
	@Input() headerSecondary: boolean;
	@Input() hasHeaderBorder: boolean;
	@Input() hasShowItemsPerPage: boolean;
	@Output() setFavourite = new EventEmitter<Product>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	prodErm = ERM.PRODUCT;
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}

}
