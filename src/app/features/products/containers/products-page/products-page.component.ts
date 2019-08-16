import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList, OnChanges, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter, map } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { ProductService, UserService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Product } from '~models';
import { FilterType, Filter } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { CreationSampleDlgComponent } from '~common/modals/component/creation-sample-dlg/creation-sample-dlg.component';
import { DialogService, CloseEventType, CloseEvent } from '~shared/dialog';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { NotificationService, NotificationType } from '~shared/notifications';
import { FiltersComponent, FilterSelectionEntityPanelComponent } from '~shared/filters/components';
import { ProductListComponent } from '~deprecated/product-list/product-list.component';
import { ProductFeatureService } from '~features/products/services';
import { SupplierRequestDialogComponent } from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

const SCREEN_MAX_WIDTH_OVERLAP = 1500;
const FILTERS_PANE_WIDTH = 300;

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
	@ViewChildren('filters', { read: ElementRef })
	public filtersElem: QueryList<ElementRef>;

	@ViewChild('productList', { read: ElementRef, static: false })
	public productListElem: ElementRef;

	public tableWidth: string;

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

	productsCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		private productSrv: ProductService,
		private notifSrv: NotificationService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Product, ProductService>,
		private featureSrv: ProductFeatureService,
		public elem: ElementRef,
		private userSrv: UserService,
		protected dlgSrv: DialogService,
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
			key: ListPageKey.PRODUCTS,
			entitySrv: this.productSrv,
			searchedFields: ['name', 'supplier.name', 'category.name', 'description'],
			selectParams: { query: 'deleted == false AND archived == false' },
			// we use the deleted filter there so we can send the query to export all to the export dlg
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.PRODUCT,
			originComponentDestroy$: this._destroy$
		}, false);

		this.productSrv.productListUpdate$.pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();

		this.productsCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.productSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
		this.onClearFilters();
	}

	onViewChange(view: 'list' | 'card') {
		this.listSrv.changeView(view);
	}

	onFavourite(product: Product) {
		this.listSrv.onItemFavorited(product.id);
	}

	onClearFilters() {
		this.listSrv.filterList.resetAll();
	}

	onShowArchived() {
		const archivedFilter = { type: FilterType.ARCHIVED, value: true };
		this.listSrv.addFilter(archivedFilter);

		this.listSrv.refetch({
			query: 'deleted == false AND archived == true',
		}).subscribe();
	}

	onHideArchived() {
		const archivedFilter = { type: FilterType.ARCHIVED, value: true };
		this.listSrv.removeFilter(archivedFilter);

		this.listSrv.refetch({
			query: 'deleted == false AND archived == false',
		}).subscribe();
	}

	onShowAssignee() {
		const assigneeFilter = { type: FilterType.ASSIGNEE, value: true };
		this.listSrv.addFilter(assigneeFilter);
	}

	onHideAssignee() {
		const assigneeFilter = { type: FilterType.ASSIGNEE, value: true };
		this.listSrv.removeFilter(assigneeFilter);
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (this.tableWidth) {
			this.tableWidth = null;
		}
	}

	onShowFilters() {
		const width = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		// for browser window less than 1500px show filters tab over the table
		if (width > SCREEN_MAX_WIDTH_OVERLAP) {
			this.tableWidth = (this.productListElem.nativeElement.offsetWidth - FILTERS_PANE_WIDTH) + 'px';
		}

		this.listSrv.openFilterPanel();
	}

	onCloseFilter() {
		const width = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

		// for browser window less than 1500px show filters tab over the table
		if (width > SCREEN_MAX_WIDTH_OVERLAP) {
			this.tableWidth = 'unset';
		}
		this.listSrv.closeFilterPanel();
	}

	getSubPanelWidth() {
		return this.tableWidth && this.tableWidth !== 'unset' ?
			(this.getWidthNumerical(this.tableWidth) - 24) + 'px' : 'unset';
	}

	private getWidthNumerical(txt: string): number {
		return txt.match(/\d+/g).map(Number)[0];
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onExport() {
		this.commonModalSrv.openExportDialog(this.listSrv.getSelectedValues());
	}

	getFilterAmount() {
		// we filter so we don't count archieved or deleted when it's false, so the user doesn't get confused since its the default filter
		const filters = this.listSrv.filterList.asFilters()
			.filter(fil => !(fil.type === FilterType.ARCHIVED && fil.value === false) && !(fil.type === FilterType.DELETED && fil.value === false));
		return filters.length;
	}

	onArchive(product: Product | Product[]) {
		// TODO i18n
		if (Array.isArray(product)) {
			this.featureSrv.updateMany(product.map((p: Product) => ({id: p.id, archived: true})))
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Product archived',
						message: 'Products have been archived with success'
					});
				});
		} else {
			const { id } = product;
			this.featureSrv.update({ id, archived: true })
				.pipe(switchMap(_ => this.listSrv.refetch()))
				.subscribe(_ => {
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Product archived',
						message: 'Products have been archived with success'
					});
				});
		}
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}
}
