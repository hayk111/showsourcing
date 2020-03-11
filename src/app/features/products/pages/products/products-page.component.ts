import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductsTableComponent } from '~common/tables/products-table/products-table.component';
import {
	ERM,
	Product,
	ProductService,
	SelectParamsConfig,
	UserService,
	EntityName
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~core/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { AutoUnsub } from '~utils';
import { ListHelperService } from '~core/list-page/list-helper.service';

// dailah lama goes into pizza store
// servant asks : what pizza do you want sir ?
// dailah lama: Make me one with everything.

@Component({
	selector: 'products-page-app',
	templateUrl: './products-page.component.html',
	styleUrls: ['./products-page.component.scss'],
	providers: [
		ListHelperService,
		ListPageService,
		ListPageViewService,
		SelectionService,
		KanbanService,
		KanbanSelectionService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class ProductsPageComponent extends AutoUnsub
	implements OnInit {
	erm = ERM;
	filterTypeEnum = FilterType;
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

	selectItemsConfig: SelectParamsConfig;
	requestCount$: Observable<number>;

	constructor(
		public listHelper: ListHelperService<Product>,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		public elem: ElementRef,
		private userSrv: UserService,
		protected dlgSrv: DialogService,
		protected kanbanSelectionSrv: KanbanSelectionService,
		private filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Product');
		this.listHelper.setup('Product');
		this.items$ = this.listHelper.getFilteredItems$();
	}

	// toggleMyProducts(show: boolean) {
	// 	const filterAssignee = {
	// 		type: FilterType.ASSIGNEE,
	// 		value: this.userSrv.userSync.id
	// 	};
	// 	if (show) this.filterSrv.addFilter(filterAssignee);
	// 	else this.filterSrv.removeFilter(filterAssignee);
	// }

	// showItemsPerPage(count: number) {
	// 	this.selectItemsConfig = { take: Number(count) };
	// 	this.listSrv.refetch(this.selectItemsConfig).subscribe();
	// }

	// onProjectDlgOpen() {
	// 	let initialProjects = [];

	// 	const values = this.selectionSrv.getSelectedValues();
	// 	// if we have more than 1 selected, we don't want initial projects to be preselected
	// 	if (values.length === 1) initialProjects = values[0].projects || [];

	// 	this.dialogCommonSrv.openAddToProjectDialog(
	// 		this.selectionSrv.getSelectedValues(),
	// 		initialProjects
	// 	);
	// }

	// onOpenCreateRequestDlg(products: Product[]) {
	// 	return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	// }

	// getSelection$() {
	// 	if (this.viewSrv.view !== 'board') {
	// 		return this.selectionSrv.selection$;
	// 	} else {
	// 		return this.kanbanSelectionSrv.selection$;
	// 	}
	// }

	// getSelectableItems$() {
	// 	if (this.viewSrv.view !== 'board') {
	// 		return this.listSrv.items$;
	// 	} else {
	// 		return this.kanbanSelectionSrv.selectableItems$;
	// 	}
	// }

	// selectAll(entities: any[]) {
	// 	if (this.viewSrv.view !== 'board') {
	// 		return this.selectionSrv.selectAll(entities);
	// 	} else {
	// 		return this.kanbanSelectionSrv.selectAllFromColumn();
	// 	}
	// }

	// unselectAll() {
	// 	if (this.viewSrv.view !== 'board') {
	// 		return this.selectionSrv.unselectAll();
	// 	} else {
	// 		return this.kanbanSelectionSrv.unselectAllFromColumn();
	// 	}
	// }
}
