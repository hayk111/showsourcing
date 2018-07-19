import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
	ProductAddToProjectDlgComponent,
} from '~features/products/components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductExportDlgComponent } from '~features/products/components/product-export-dlg/product-export-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from '~features/products/components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { ProductFeatureService } from '~features/products/services';
import { TagService, CategoryService, SupplierService, EventService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { ERM, Product, Tag, Event, Category, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
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
	searchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: ProductFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, ERM.PRODUCT);
	}

	/**
	 * Selection bar actions
	 *
	 * Each of the actions to open dialog below will open a dialog that is itself a container.
	 */

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}


	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectedProducts()
		});
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

}
