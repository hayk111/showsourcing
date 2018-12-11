import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-app',
	templateUrl: './supplier-products.component.html',
	styleUrls: ['./supplier-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class SupplierProductsComponent extends TrackingComponent implements OnInit {

	products$: Observable<Product[]>;
	hasSearch = false;
	constructor(
		protected router: Router,
		private route: ActivatedRoute,
		public thumbSrv: ThumbService,
		private productSrv: ProductService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonDlgSrv: CommonDialogService
	) {
		super();

	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.listSrv.setup({
			key: ListPageKey.PRODUCTS,
			entitySrv: this.productSrv,
			searchedFields: ['name'],
			currentSort: { sortBy: 'name', descending: true },
			initialPredicate: `supplier.id == "${id}"`,
			entityMetadata: ERM.PRODUCT
		});
	}

	search(event: any) {
		this.listSrv.search(event);
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
