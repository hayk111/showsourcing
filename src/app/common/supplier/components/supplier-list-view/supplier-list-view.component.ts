import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { ERM, Supplier } from '~models';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	activities: { title: 'activities', translationKey: 'activities', width: 190, sortable: false },
	country: { title: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { title: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	productType: { title: 'product type', translationKey: 'product-type', width: 190, sortable: false },
	createdBy: { title: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'creationDate' },
	favorite: { title: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	name: { title: 'name', translationKey: 'name', width: 190, sortProperty: 'name' },
	status: { title: 'status', translationKey: 'status', width: 190, sortProperty: 'status.step' },
};


@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: [
		'./supplier-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent extends ListViewComponent<Supplier> {

	columns = ['name', 'country', 'productType', 'supplierType', 'createdBy', 'activities', 'status'];
	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Input() tableConfig = tableConfig;
	@Output() archive = new EventEmitter<Supplier>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	constructor(public translate: TranslateService) {
		super();
	}

}
