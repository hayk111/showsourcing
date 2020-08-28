import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { api, Product } from 'showsourcing-api-lib';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub } from '~utils';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	providers: [ListHelper2Service, ListPageViewService, FilterService, SortService, SelectionService, PaginationService],
	host: {
		class: 'table-page',
	},
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
		FilterType.FAVORITE,
	];
	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	products$ = this.listHelper.data$.pipe(
		map((products: Product[]) => {
			return products.map((product: any) => {
				product.images = api.Image.findLocal({
					filter: {
						property: 'nodeId',
						isString: 'Product:' + product.id,
					},
				});
				return product;
			});
		})
	);

	@ViewChild(ProductsTableComponent, { static: false }) productsTable: ProductsTableComponent;

	constructor(
		public filterSrv: FilterService,
		public listHelper: ListHelper2Service<Product>,
		public viewSrv: ListPageViewService<Product>,
		public dialogCommonSrv: DialogCommonService,
		public ratingSrv: RatingService,
		protected dlgSrv: DialogService
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
