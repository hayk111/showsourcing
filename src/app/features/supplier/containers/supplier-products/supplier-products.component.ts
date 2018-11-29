import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '~global-services';
import { ERM, Product, ERM_TOKEN } from '~models';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';

@Component({
	selector: 'supplier-app',
	templateUrl: './supplier-products.component.html',
	styleUrls: ['./supplier-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.SUPPLIER_PRODUCT, ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }]
})
export class SupplierProductsComponent extends TrackingComponent implements OnInit {

	products$: Observable<Product[]>;
	hasSearch = false;
	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected thumbSrv: ThumbService,
		protected featureSrv: ProductService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, ProductService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();

	}

	ngOnInit() {

		const id = this.route.parent.snapshot.params.id;
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'name',
			initialPredicate: `supplier.id == "${id}"`
		});
		this.dataSrv.init();
	}

	search(event: any) {
		this.dataSrv.search(event);
		this.hasSearch = true;
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product?: Product) {
		this.commonDlgSrv.openExportDialog();
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product?: Product) {
		this.commonDlgSrv.openRequestFeedbackDialog();
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog() {
		this.commonDlgSrv.openAddToProjectDialog();
	}
}
