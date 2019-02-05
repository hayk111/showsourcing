import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { ProductService, SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Product, Supplier } from '~core/models';
import { ID } from '~utils/id.utils';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-products-page-app',
	templateUrl: './supplier-products-page.component.html',
	styleUrls: ['./supplier-products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsPageComponent extends TrackingComponent implements OnInit {

	supplierId: ID;
	supplier$: Observable<Supplier>;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.supplierId = this.route.snapshot.params.id;
		this.supplier$ = this.supplierSrv.queryOne(this.supplierId);
		this.listSrv.setup({
			key: `supplier-products-${this.supplierId}`,
			entitySrv: this.productSrv,
			searchedFields: ['name'],
			selectParams: {
				query: `supplier.id == "${this.supplierId}" AND archived == false`,
			},
			entityMetadata: ERM.PRODUCT
		});
	}

	update(supplier: Supplier) {
		this.supplierSrv.update(supplier).subscribe();
	}

	delete(supplier: Supplier) {
		this.commonModalSrv.openConfirmDialog({ text: 'are you sure you want to delete this supplier ?' }).pipe(
			switchMap(_ => this.supplierSrv.delete(supplier.id))
		).subscribe(_ => this.router.navigate(['supplier', 'all']));
	}

	onViewChange(view: 'list' | 'card') {
		// Update sorting according to the selected view
		this.listSrv.sort({ sortBy: 'name', descending: false });
		this.listSrv.changeView(view);
	}

	export() {
		this.listSrv.dataSrv.items$.pipe(first()).subscribe((products: Product[]) => this.commonModalSrv.openExportDialog(products));
	}
}
