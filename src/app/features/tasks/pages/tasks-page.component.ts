import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { TasksTableComponent } from '~common/tables/tasks-table/tasks-table.component';
import {
	ERM,
	SelectParamsConfig,
	Task,
	TaskService,
	UserService
} from '~core/erm';
import { ListPageService } from '~core/list-page';
import { DialogService } from '~shared/dialog';
import { FilterService, FilterType } from '~core/filters';
import { AutoUnsub } from '~utils';
import { SelectionService, ListFuseHelperService, ListPageViewService } from '~core/list-page2';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListFuseHelperService,
		SelectionService,
		FilterService,
		ListPageViewService
	],
	host: {
		class: 'table-page'
	}
})
export class TasksPageComponent implements OnInit {
	public tableWidth: string;

	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.CREATED_BY,
		FilterType.PROJECTS,
		FilterType.SUPPLIER
	];
	columns = TasksTableComponent.DEFAULT_COLUMNS;
	tableConfig = TasksTableComponent.DEFAULT_TABLE_CONFIG;

	tasksCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public filterSrv: FilterService,
		public selectionSrv: SelectionService,
		public listHelper: ListFuseHelperService,
		public statusSrv: StatusSelectorService,
		public viewSrv: ListPageViewService<any>
	) {
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Task');
		this.viewSrv.setup({ typename: 'Task', destUrl: 'tasks', view: 'table' });
	}


	showTasksCreatedByMeOnly() {
		// const predicate = this.filterSrv.filterList.asPredicate();
		// const query = `${predicate && predicate + ' AND '} (createdBy.id == "${
		// 	this.userSrv.userSync.id
		// }")`;

		// this.listSrv
		// 	.refetch({
		// 		query
		// 	})
		// 	.subscribe();
	}

	hideTasksCreatedByMeOnly() {
		// this.listSrv.refetch().subscribe();
	}

	toggleMyProducts(show: boolean) {
		// const filterAssignee = {
		// 	type: FilterType.ASSIGNEE,
		// 	value: this.userSrv.userSync.id
		// };
		// if (show) this.filterSrv.addFilter(filterAssignee);
		// else this.filterSrv.removeFilter(filterAssignee);
	}

	showItemsPerPage(count: number) {
		// this.selectItemsConfig = { take: Number(count) };
		// this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
