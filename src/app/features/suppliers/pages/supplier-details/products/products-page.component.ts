import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { CreationProductDlgComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductService, SupplierService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Product, Supplier } from '~core/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/controller-list/services/controller-list.service';
import { AutoUnsub } from '~utils';
import { ID } from '~utils/id.utils';

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' }
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
		private controllerListService: ControllerListService,
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

	onClearFilters() {
		this.listSrv.filterList.resetAll();

		this.listSrv.addFilter({ type: FilterType.ARCHIVED, value: false });
		this.listSrv.addFilter({ type: FilterType.DELETED, value: false });
		this.controllerListService.onFiltersClear();
	}

}
