import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task, ERM } from '~models';
import { switchMap } from 'rxjs/operators';
import { FilterType } from '~shared/filters';

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
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(
			router,
			userSrv,
			taskSrv,
			commonModalSrv,
			listSrv
		);
	}

	ngOnInit() {
		super.setup([]);

	}

	createTask(name: string) {
		const newTask = new Task({
			name,
			product: { id: this.route.parent.snapshot.params.id }
		});
		this.taskSrv.create(newTask).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}
}
