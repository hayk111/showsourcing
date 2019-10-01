import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil, switchMap } from 'rxjs/operators';
import { CommonModalService, CreationProductDlgComponent } from '~common/modals';
import { ProductService, SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Product, Supplier } from '~core/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';

@Component({
	selector: 'supplier-products-page-app',
	templateUrl: './supplier-products-page.component.html',
	styleUrls: ['./supplier-products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsPageComponent extends AutoUnsub implements OnInit {

	supplierId: ID;
	private supplier: Supplier;
	erm = ERM;

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Product, ProductService>,
		public commonModalSrv: CommonModalService,
		public dlgSrv: DialogService
	) { super(); }

	ngOnInit() {
		this.supplierId = this.route.parent.snapshot.params.id;

		this.supplierSrv.queryOne(this.supplierId).pipe(
			takeUntil(this._destroy$)
		).subscribe(sup => this.supplier = sup);

		this.listSrv.setup({
			key: `supplier-products-${this.supplierId}`,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'description'],
			selectParams: {
				query: `supplier.id == "${this.supplierId}" AND archived == false AND deleted == false`,
			},
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		});
	}

	openCreationProductDlg() {
		const supplier = { id: this.supplier.id, name: this.supplier.name };
		this.dlgSrv.open(CreationProductDlgComponent, { product: new Product({ supplier }) }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			map((evt: CloseEvent) => evt.data),
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
