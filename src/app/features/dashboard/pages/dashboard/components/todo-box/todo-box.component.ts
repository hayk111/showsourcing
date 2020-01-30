import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierService } from '~core/orm/services';
import { ListPageService } from '~core/list-page';
import { ERM } from '~core/orm/models';
import { DashboardService, TodoCounts, TodoEntities } from '~features/dashboard/services/dashboard.service';

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
	) { }

	ngOnInit() {
		this.todoCounters$ = this.dashboardSrv.getTodoCounters();
		this.rows$ = this.dashboardSrv.getFirstFewEntitiesAssignedToMe();
	}

	get route() {
		return this.selectedTab + 's';
	}

	updated() {
		this.rows$ = this.dashboardSrv.getFirstFewEntitiesAssignedToMe();
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
				this.dialogCommonSrv.openCreationSampleDialog();
				break;
			case 'supplier':
				this.dialogCommonSrv.openCreateDlg(ERM.SUPPLIER);
				break;
		}
	}

}
