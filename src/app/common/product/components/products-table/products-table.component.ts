import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page/entity-table.component';
import { ERM, Product } from '~models';
import { Color } from '~utils';
import { TranslateService } from '@ngx-translate/core';

const bigTableConfig: TableConfig = {
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
	reference: { name: 'reference', translationKey: 'reference', width: 247, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 190, sortProperty: 'supplier.id' },
};

const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 190, sortProperty: 'creationDate' },
	reference: { name: 'reference', translationKey: 'reference', width: 320, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 165, sortProperty: 'status.step' },
};

@Component({
	selector: 'products-table-app',
	templateUrl: './products-table.component.html',
	styleUrls: [
		'./products-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent extends EntityTableComponent<Product> implements OnInit {
	columns = ['reference', 'price', 'moq', 'supplier', 'category', 'assignee', 'status', 'activities', 'createdBy', 'createdOn'];
	@Input() tableWidth: number;
	@Input() hasVerticalScroll: boolean;
	@Input() headerSecondary: boolean;
	@Input() hasHeaderBorder: boolean;
	@Input() hasShowItemsPerPage: boolean;
	@Input() tableConfigType: TableConfigType = 'big';
	@Output() setFavourite = new EventEmitter<Product>();
	@Output() openAddToProjectDialog = new EventEmitter<Product>();
	@Output() openAddTaskDialog = new EventEmitter<Product>();
	@Output() openAddSampleDialog = new EventEmitter<Product>();

	@Output() archive = new EventEmitter<Product>();
	@Output() delete = new EventEmitter<Product>();
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}

	ngOnInit() {
		this.tableConfig = this.getTableFromType();
		super.ngOnInit();
	}

	getTableFromType() {
		switch (this.tableConfigType) {
			case 'big':
				return bigTableConfig;
			case 'medium':
				return mediumTableConfig;
			default:
				return bigTableConfig;
		}
	}

}
