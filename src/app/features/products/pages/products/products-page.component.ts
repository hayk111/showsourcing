import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { SupplierRequestDialogComponent } from '~common/modals/custom/supplier-request-dialog/supplier-request-dialog.component';
import { ProductService, UserService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/header-list/services/controller-list.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageService,
		CommonModalService
	]
})
export class ProductsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	@ViewChild('productList', { read: ElementRef, static: false })
	public productListElem: ElementRef;

	public tableWidth: string;
	public addProductMargin: string;

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
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	selectItemsConfig: SelectParamsConfig;
	requestCount$: Observable<number>;

	constructor(
		private productSrv: ProductService,
		private notifSrv: NotificationService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Product, ProductService>,
		private featureSrv: ProductFeatureService,
		public elem: ElementRef,
		private userSrv: UserService,
		private translate: TranslateService,
		protected dlgSrv: DialogService,
		private controllerListService: ControllerListService,
	) {
		super();
	}

	toggleMyProducts(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}
	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name', 'description'],
			// we use the deleted filter there so we can send the query to export all to the export dlg
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		}, false);

		this.productSrv.productListUpdate$.pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}

	onClearFilters() {
		this.listSrv.filterList.resetAll();

		this.listSrv.addFilter({ type: FilterType.ARCHIVED, value: false });
		this.listSrv.addFilter({ type: FilterType.DELETED, value: false });
		this.controllerListService.onFiltersClear();
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onArchive(product: Product | Product[]) {
		if (Array.isArray(product)) {
			this.featureSrv.updateMany(product.map((p: Product) => ({ id: p.id, archived: true })))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.products-archived'),
						message: this.translate.instant('message.products-archived-successfully')
					});
				});
		} else {
			const { id } = product;
			this.featureSrv.update({ id, archived: true })
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: this.translate.instant('title.product-archived'),
						message: this.translate.instant('message.product-archived-successfully')
					});
				});
		}
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}
}
