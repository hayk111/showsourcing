import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { ERM, Supplier } from '~models';
import { TranslateService } from '@ngx-translate/core';

const tableConfig: TableConfig = {
	activities: { title: 'activities', translationKey: 'activities', width: 190 },
	country: { title: 'country', translationKey: 'country', width: 140, sortProperty: 'country' },
	supplierType: { title: 'type', translationKey: 'type', width: 190, sortProperty: 'supplierType.name' },
	productType: { title: 'product type', translationKey: 'product-type', width: 190 },
	createdBy: { title: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	favorite: { title: 'favorite', translationKey: 'favorite', width: 50, sortProperty: 'favorite' },
	reference: { title: 'reference', translationKey: 'reference', width: 190, sortProperty: 'reference' },
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

	columns = [ 'reference', 'country', 'productType', 'supplierType', 'createdBy', 'activities', 'status' ];
	tableConfig = tableConfig;
	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Output() archive = new EventEmitter<Supplier>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	constructor(public translate: TranslateService) {
		super();
	}

}
