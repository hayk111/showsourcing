import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Task, ERM } from '~models';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService } from '~shared/dialog';
import { Router } from '@angular/router';
import { CreateTaskDialogComponent } from '~shared/task/components/create-task-dialog/create-task-dialog.component';
import { TaskService } from '~global-services';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss']
})
// the service should be TaskService instead ofthis temporary one
export class MyTasksPageComponent extends ListPageComponent<Task, TaskService> implements OnInit {

	constructor(
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK, CreateTaskDialogComponent);
	}

	toggleFilter(show: boolean) {
		// implement filter to show only my tasks
	}
}
