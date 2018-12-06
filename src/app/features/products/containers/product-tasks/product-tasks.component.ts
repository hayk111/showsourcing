import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task, ERM } from '~models';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})

export class ProductTasksComponent extends AbstractTaskCommonComponent
	implements OnInit {

	erm = ERM.TASK;

	constructor(
		private route: ActivatedRoute,
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
		// this.listSrv.addFilter({
		// 	type: FilterType.PRODUCT,
		// 	value: this.route.parent.snapshot.params.id
		// });
	}

	createTask(name: string) {
		const newTask = new Task({
			name,
			product: { id: this.route.parent.snapshot.params.id }
		});
		this.taskSrv.create(newTask).subscribe();
		this.listSrv.refetch();
	}
}
