import { Component, NgModuleRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { ERM, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { CreateTaskDialogComponent } from '~shared/task-common/components/create-task-dialog/create-task-dialog.component';
import { realmDateFormat } from '~utils/realm-date-format.util';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss']
})
export class MyTasksPageComponent extends ListPageComponent<Task, TaskService> implements OnInit, AfterViewInit {

	constructor(
		private userSrv: UserService,
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK, CreateTaskDialogComponent);
	}

	ngAfterViewInit() {
		this.filterList.addFilter({ type: FilterType.DUE_DATE, value: realmDateFormat(new Date()) });
		this.filterList.addFilter({ type: FilterType.DONE, value: false });
	}

	toggleMyTasks(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.filterList.addFilter(filterAssignee);
		else
			this.filterList.removeFilter(filterAssignee);
	}

	toggleDoneTasks(show: boolean) {
		if (show) {
			this.filterList.removeFilterType(FilterType.DUE_DATE);
			this.filterList.removeFilterType(FilterType.DONE);
		} else {
			this.filterList.addFilter({ type: FilterType.DUE_DATE, value: realmDateFormat(new Date()) });
			this.filterList.addFilter({ type: FilterType.DONE, value: false });
		}
		// this.filterList.removeFilter(filterDone);
	}
}
