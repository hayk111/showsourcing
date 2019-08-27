import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Product, Supplier, ERM } from '~models';
import { Observable, of } from 'rxjs';

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

	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Output() archive = new EventEmitter<Supplier>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor() {
		super();
	}

}
