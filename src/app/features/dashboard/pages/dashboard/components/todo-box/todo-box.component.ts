import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, Supplier } from '~core/models';
import { DashboardService, TodoCounts, TodoEntities } from '~features/dashboard/services/dashboard.service';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'todo-box-app',
	templateUrl: './todo-box.component.html',
	styleUrls: ['./todo-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TodoBoxComponent implements OnInit {
	public todoCounters$: Observable<TodoCounts>;
	public rows$: Observable<TodoEntities>;
	selectedTab = 'product';
	entities = ['product', 'task', 'supplier', 'sample'];

	constructor(
		private supplierSrv: SupplierService,
		public dialogCommonSrv: DialogCommonService,
		public dashboardSrv: DashboardService,
		private listSrv: ListPageService<Supplier, SupplierService>
	) { }

	ngOnInit() {
		this.todoCounters$ = this.dashboardSrv.getTodoCounters();
		this.rows$ = this.dashboardSrv.getFirstFewEntitiesAssignedToMe();

		/**
		 * Supplier creation is not organized with common modal service so we need to copy settings from supplier page
		 */
		this.listSrv.setup({
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.SUPPLIER,
		}, false);

	}

	get route() {
		if (this.selectedTab === 'product' || this.selectedTab === 'supplier') return this.selectedTab;
		return this.selectedTab + 's';
	}

	openCreationModal() {
		switch (this.selectedTab) {
			case 'product':
				this.dialogCommonSrv.openCreationProductDlg();
				break;
			case 'task':
				this.dialogCommonSrv.openCreationTaskDlg();
				break;
			case 'sample':
				this.dialogCommonSrv.openAddSampleDialog();
				break;
			case 'supplier':
				this.listSrv.create();
				break;
		}
	}

}
