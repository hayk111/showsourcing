import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageService } from '~core/list-page';
import { ProductService } from '~entity-services';
import { ERM, Product } from '~models';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';

@Component({
	selector: 'supplier-products-app',
	templateUrl: './supplier-products.component.html',
	styleUrls: ['./supplier-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class SupplierProductsComponent extends AutoUnsub implements OnInit {

	hasSearch = false;
	supplierId: ID;
	maxItemsDisplay = 15;

	constructor(
		protected router: Router,
		private route: ActivatedRoute,
		public thumbSrv: ThumbService,
		private productSrv: ProductService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService
	) {
		super();
	}

	ngOnInit() {
		this.supplierId = this.route.parent.snapshot.params.id;
		this.listSrv.setup({
			key: `supplier-products-${this.supplierId}`,
			entitySrv: this.productSrv,
			searchedFields: ['name'],
			selectParams: { query: `supplier.id == "${this.supplierId}" AND archived == false AND deleted == false` },
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		});
	}

	search(event: any) {
		this.listSrv.search(event);
		this.hasSearch = true;
	}

	viewAll() {
		this.router.navigate(['supplier', 'all-products', this.supplierId]);
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product?: Product) {
		this.commonModalSrv.openExportDialog([product]);
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product?: Product) {
		this.commonModalSrv.openRequestFeedbackDialog([product]);
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog() {
		this.commonModalSrv.openAddToProjectDialog();
	}

	previewUpdated() {
		this.listSrv.refetch().pipe(first()).subscribe();
	}
}
