import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFeatureService } from '~features/products/services';
import { Product } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { StoreKey } from '~utils/store/store';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: FilterService, useValue: new FilterService(StoreKey.FILTER_PRODUCT) },
		SelectionService
	]
})
export class ProductsPageComponent extends ListPageComponent<Product, ProductFeatureService> implements OnInit {

	constructor(
		protected router: Router,
		protected featureSrv: ProductFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, 'product', DialogName.NEW_PRODUCT);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.open(DialogName.ADD_TO_PROJECT, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.open(DialogName.EXPORT, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.open(DialogName.REQUEST_FEEDBACK, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	get selectionArray() {
		return Array.from(this.selectionSrv.selection.keys());
	}

}
