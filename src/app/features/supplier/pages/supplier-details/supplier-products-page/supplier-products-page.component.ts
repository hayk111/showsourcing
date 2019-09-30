import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap, filter, map } from 'rxjs/operators';
import { CommonModalService, CreationProductDlgComponent } from '~common/modals';
import { ProductService, SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Product, Supplier } from '~core/models';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, CloseEventType, CloseEvent } from '~shared/dialog';

@Component({
	selector: 'supplier-products-page-app',
	templateUrl: './supplier-products-page.component.html',
	styleUrls: ['./supplier-products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsPageComponent extends AutoUnsub implements OnInit {

	supplierId: ID;
	supplier$: Observable<Supplier>;
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
		this.supplierId = this.route.snapshot.params.id;
		this.supplier$ = this.supplierSrv.queryOne(this.supplierId);
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
		this.dlgSrv.open(CreationProductDlgComponent).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			map((evt: CloseEvent) => evt.data)
		).subscribe(({ product }) => {
			this.listSrv.refetch();
		});
	}

}
