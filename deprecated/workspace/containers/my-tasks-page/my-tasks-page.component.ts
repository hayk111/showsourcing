import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractTaskCommonComponent } from '~common/abstracts/abstract-task-common.component';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'my-tasks-page-app',
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
		protected route: ActivatedRoute,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(
			router,
			route,
			userSrv,
			taskSrv,
			dlgSrv,
			commonModalSrv,
			listSrv
		);
	}

	ngOnInit() {
		const userId = this.userSrv.userSync.id;
		super.setup([
			{
				type: FilterType.ASSIGNEE,
				value: userId
			}
		]);
		super.ngOnInit();
	}

}
