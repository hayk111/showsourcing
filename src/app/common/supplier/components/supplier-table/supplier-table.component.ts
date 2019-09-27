import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page/entity-table.component';
import { ERM, Supplier } from '~models';

const bigTableConfig: TableConfig = {
	activities: { name: 'activities', translationKey: 'activities', width: 190, sortable: false },
	country: { name: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { name: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	productType: { name: 'product type', translationKey: 'product-type', width: 190, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'creationDate' },
	favorite: { name: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	name: { name: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
};

// it comes form todo box
const mediumTableConfig: TableConfig = {
	reference: { name: 'reference', translationKey: 'reference', width: 500, sortProperty: 'reference' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status.step' },
};

@Component({
	selector: 'supplier-table-app',
	templateUrl: './supplier-table.component.html',
	styleUrls: [
		'./supplier-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierTableComponent extends EntityTableComponent<Supplier> {

	columns = ['name', 'country', 'productType', 'supplierType', 'createdBy', 'activities', 'status'];
	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() archive = new EventEmitter<Supplier>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	constructor(public translate: TranslateService) {
		super();
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
