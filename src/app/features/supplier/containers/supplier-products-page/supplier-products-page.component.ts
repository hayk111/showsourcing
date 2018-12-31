import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { ListPageService } from '~core/list-page';
import { Product, ERM, Supplier } from '~core/models';
import { ProductService, SupplierService } from '~core/entity-services';
import { CommonModalService } from '~common/modals';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '~utils/id.utils';
import { Observable } from 'rxjs';
import { CloseEventType } from '~shared/dialog';
import { filter, first, switchMap } from 'rxjs/operators';

@Component({
	selector: 'supplier-products-page-app',
	templateUrl: './supplier-products-page.component.html',
	styleUrls: ['./supplier-products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsPageComponent extends TrackingComponent implements OnInit {

	supplierId: ID;
	supplier$: Observable<Supplier>;

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
				query: `supplier.id == "${this.supplierId}" AND deleted == false AND archived == false`,
			},
			entityMetadata: ERM.PRODUCT
		});
	}

	update(supplier: Supplier) {
		this.supplierSrv.update(supplier).subscribe();
	}

	delete(supplier: Supplier) {
		this.commonModalSrv.openConfirmDialog({ text: 'are you sure you want to delete this supplier ?' }).pipe(
			filter(evt => evt.type === CloseEventType.OK),
			first(),
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
