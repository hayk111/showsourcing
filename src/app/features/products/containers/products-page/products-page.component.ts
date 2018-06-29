import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
	ProductAddToProjectDlgComponent,
} from '~features/products/components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductExportDlgComponent } from '~features/products/components/product-export-dlg/product-export-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from '~features/products/components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';
import { CreationDialogComponent } from '~shared/generic-dialog';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PRODUCT },
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
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, ERM.PRODUCT);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.open(ProductExportDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, {
			selectedProducts: product ? [product] : this.selectionArray
		});
	}

	get selectionArray() {
		return Array.from(this.selectionSrv.selection.keys());
	}

}
