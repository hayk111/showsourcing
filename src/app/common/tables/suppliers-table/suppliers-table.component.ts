import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page/entity-table.component';
import { ERM, Supplier } from '~models';
import { Status } from '~core/models/status.model';

const bigTableConfig: TableConfig = {
	activities: { name: 'activities', translationKey: 'activities', width: 190, sortable: false },
	country: { name: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { name: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	productType: { name: 'product type', translationKey: 'product-type', width: 190, sortable: false },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	favorite: { name: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	name: { name: 'name', translationKey: 'name', width: 320, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
	assignee: { name: 'assignee', translationKey: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
};

const mediumTableConfig: TableConfig = {
	reference: { name: 'reference', translationKey: 'reference', width: 500, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status.step' },
};

@Component({
	selector: 'suppliers-table-app',
	templateUrl: './suppliers-table.component.html',
	styleUrls: [
		'./suppliers-table.component.scss',
		'../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliersTableComponent extends EntityTableComponent<Supplier> implements OnInit {

	columns = ['name', 'country', 'productType', 'supplierType', 'assignee', 'status', 'activities', 'createdBy', 'createdOn'];
	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() archive = new EventEmitter<Supplier>();
	@Output() statusUpdated = new EventEmitter<Status>();

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
