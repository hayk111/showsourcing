import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CreationProductDlgComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductService, SupplierService } from '~core/erm/services';
import { SelectParams } from '~core/erm/services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Product, Supplier } from '~core/erm/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' },
	providers: [ListPageService]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit {

	supplierId: ID;
	private supplier: Supplier;
	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.ARCHIVED,
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.TAGS
	];

	constructor(
		private route: ActivatedRoute,
		private productSrv: ProductService,
		private supplierSrv: SupplierService,
		public listSrv: ListPageService<Product, ProductService>,
		public dialogCommonSrv: DialogCommonService,
		public dlgSrv: DialogService,
	) { super(); }

	ngOnInit() {
		this.supplierId = this.route.parent.snapshot.params.id;

		this.supplierSrv.queryOne(this.supplierId).pipe(
			takeUntil(this._destroy$)
		).subscribe(sup => this.supplier = sup);

		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'description'],
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			selectParams: new SelectParams({ query: `supplier.id == "${this.supplierId}"` }),
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

	/** instead of deleting the product, we deassociate the supplier from it */
	deassociateOneProduct(product?: Product) {
		this.deassociateProducts([product]);
	}

	/** instead of deleting the selected products, we deassociate the supplier from them */
	deassociateSelectedProducts(product?: Product) {
		const products = product ? [product] : this.listSrv.selectionSrv.getSelectionValues();
		this.deassociateProducts(products);
		this.listSrv.selectionSrv.unselectAll();
	}

	/** function that deassociate products from supplier */
	private deassociateProducts(products: Product[]) {
		this.supplierSrv.deassociateProducts(products).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
