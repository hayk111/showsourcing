import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardService, TodoCounts, TodoEntities } from '~features/dashboard/services/dashboard.service';
import { Observable } from 'rxjs';
import { CommonModalService } from '~common/modals';
import { ListPageService, ListPageKey } from '~core/list-page';
import { SupplierService } from '~core/entity-services';
import { Supplier, ERM } from '~core/models';
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
	selectedEntity = 'product';
	entities = ['product', 'task', 'supplier', 'sample'];

	constructor(
		private supplierSrv: SupplierService,
		public commonModalSrv: CommonModalService,
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
			key: ListPageKey.SUPPLIER,
			entitySrv: this.supplierSrv,
			searchedFields: ['name', 'tags.name', 'categories.name', 'description'],
			initialFilters: [{ type: FilterType.ARCHIVED, value: false }, { type: FilterType.DELETED, value: false }],
			entityMetadata: ERM.SUPPLIER,
		}, false);

	}

	get route() {
		if (this.selectedEntity === 'product' || this.selectedEntity === 'supplier') return this.selectedEntity;
		return this.selectedEntity + 's';
	}

	openCreationModal() {
		switch (this.selectedEntity) {
			case 'product':
				this.commonModalSrv.openCreationProductDlg();
				break;
			case 'task':
				this.commonModalSrv.openCreationTaskDlg();
				break;
			case 'sample':
				this.commonModalSrv.openAddSampleDialog();
				break;
			case 'supplier':
				this.listSrv.create();
				break;
		}
	}

}
