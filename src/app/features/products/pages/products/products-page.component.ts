import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
	SupplierRequestDialogComponent,
} from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductService, UserService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { NotificationService } from '~shared/notifications';
import { AutoUnsub } from '~utils';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListPageService,
		DialogCommonService
	],
	host: {
		class: 'table-page'
	}
})
export class ProductsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
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
	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	selectItemsConfig: SelectParamsConfig;
	requestCount$: Observable<number>;

	constructor(
		private productSrv: ProductService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Product, ProductService>,
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

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onProjectDlgOpen() {
		let initialProjects = [];

		this.listSrv.getSelectedValues().forEach((product: Product) => {
			initialProjects = [...initialProjects, ...product.projects];
		});

		initialProjects = this.removeDuplicates(initialProjects, 'id');

		this.dialogCommonSrv.openAddToProjectDialog(this.listSrv.getSelectedValues(), initialProjects);
	}

	private removeDuplicates(originalArr, prop) {
		return originalArr.filter((obj, pos, arr) => {
				return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
		});
	}

	onOpenCreateRequestDlg(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}

}
