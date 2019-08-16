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
export class SupplierListViewComponent extends ListViewComponent<Supplier> implements OnChanges {

	erm = ERM;
	supplierErm = ERM.SUPPLIER;

	@Output() archive = new EventEmitter<Supplier>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	ngOnChanges() {
		console.log('TCL: SupplierListViewComponent -> ngOnChanges -> this.rows', this.rows);
	}

	// should be fixed. The function should return open requests count for every product
	getProductOpenRequests(product: Product): Observable<number> {
		// return this.requestElementService.queryCount(`targetId == "${product.id}"`).pipe(first());
		return of(1); // just a value for testing
	}

	constructor() {
		super();
	}

}
