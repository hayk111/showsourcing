import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import { ERM, Product, SelectParamsConfig } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { DialogService } from '~shared/dialog';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { AutoUnsub } from '~utils';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'table-page-app',
	templateUrl: './table-page.component.html',
	styleUrls: ['./table-page.component.scss'],
	providers: [
		ListHelperService,
		ListPageViewService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class TablePageComponent implements OnInit {
	items$: Observable<Product[]>;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PROJECTS,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.CATEGORY,
		FilterType.STATUS,
		FilterType.TAGS,
		FilterType.ARCHIVED,
		FilterType.FAVORITE
	];
	columns = ProductsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProductsTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		public listHelper: ListHelperService<Product>,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		protected dlgSrv: DialogService,
	) { }

	ngOnInit() {
		this.listHelper.setup('Product');
		this.viewSrv.setup({ typename: 'Product', destUrl: 'products', view: 'table' });
		this.items$ = this.listHelper.filteredItems$;
	}

}
