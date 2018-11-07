import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '~global-services';
import { ERM, Product } from '~models';
import { ProductExportDlgComponent, ProductRequestTeamFeedbackDlgComponent, ProductAddToProjectDlgComponent } from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';

@Component({
	selector: 'supplier-app',
	templateUrl: './supplier-products.component.html',
	styleUrls: ['./supplier-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService
	]
})
export class SupplierProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	products$: Observable<Product[]>;
	hasSearch = false;

	constructor(
		protected router: Router,
		protected featureSrv: ProductService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>,
		protected thumbSrv: ThumbService) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, thumbSrv);

	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.initialPredicate = `supplier.id == "${id}"`;
		super.ngOnInit();
	}

	search(event: any) {
		super.search(event);
		this.hasSearch = true;
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product?: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.selectionItems()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product?: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.selectionItems()
		});
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(product?: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.selectionItems()
		});
	}
}
