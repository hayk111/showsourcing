import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~common/task/containers/abstract-task-common.component';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task } from '~models';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class MyTasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

	constructor(
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		public commonDlgSrv: CommonDialogService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(
			router,
			userSrv,
			taskSrv,
			commonDlgSrv,
			listSrv
		);
	}

	ngOnInit() {
		super.ngOnInit();
	}

}
