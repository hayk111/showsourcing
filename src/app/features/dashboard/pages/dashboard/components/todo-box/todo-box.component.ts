import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { DashboardService, TodoCounts, TodoEntities } from '~features/dashboard/services/dashboard.service';
import { Typename } from '~core/erm3/typename.type';
import { ApiService } from '~core/erm3/services/api.service';

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
		public dlgCommonSrv: DialogCommonService,
		public dashboardSrv: DashboardService,
		private apiSrv: ApiService
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

	createEntity() {
		const typename = this.selectedTabToTypename(this.selectedTab);
		this.dlgCommonSrv.openCreationDlg(typename).data$
		.subscribe(entity => this.apiSrv.create(typename, entity));
	}

	/** transform 'product' | 'task' | 'sample' | 'supplier' to 'Product' | 'Task' | 'Sample' | 'Supplier */
	selectedTabToTypename(selectedTab: string): Typename {
		const typename = selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1);
		return typename as Typename;
	}

}
