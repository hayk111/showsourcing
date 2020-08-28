import { Component, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { RatingService } from '~shared/rating/services/rating.service';
import { api, Product } from 'showsourcing-api-lib';
import { AutoUnsub } from '~utils';
// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	providers: [
		ListHelper2Service,
		ListPageViewService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class TablePageComponent extends AutoUnsub implements OnInit, OnDestroy {
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.CATEGORY,
		FilterType.PROJECT,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.TAGS,
		FilterType.STATUS,
		FilterType.ARCHIVED,
		FilterType.FAVORITE
	];
	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;
	productsWithImages: any [];
	productsSub: Subscription;

	@ViewChild(ProductsTableComponent, { static: false }) productsTable: ProductsTableComponent;

	constructor(
		public filterSrv: FilterService,
		public listHelper: ListHelper2Service<Product>,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		public ratingSrv: RatingService,
		private cdr: ChangeDetectorRef,
		protected dlgSrv: DialogService,
		private paginationSrv: PaginationService,
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.viewSrv.setup({ typename: 'Product', destUrl: 'products', view: 'table' });
		this.listHelper.setup('Product', this._destroy$);
	}

	addProject() {
		// this.dialogCommonSrv.openSelectionDlg('Project', this.selectionSrv.getSelectedValues());
		// TODO add the correct logic for submit
	}

	addToProject(event) {
		// this.dlgCommonSrv.openSelectionDlg('Project', [event]);
		// TODO add the logic after closing dialog
	}
}
