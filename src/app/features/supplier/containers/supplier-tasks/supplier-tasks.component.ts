import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task } from '~models';
import { FilterType } from '~shared/filters';
import { switchMap } from 'rxjs/operators';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss'],
	providers: [
		ListPageService
	]
})
export class SupplierTasksComponent extends AbstractTaskCommonComponent implements OnInit {

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
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
		super.setup([
			{ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id }
		]);
	}

	createTask(name: string) {
		const newTask = new Task({
			name,
			supplier: { id: this.route.parent.snapshot.params.id },
			assignee: { id: this.userSrv.userSync.id }
		});
		this.taskSrv.create(newTask).pipe(
			switchMap(_ => this.listSrv.refetch({}))
		).subscribe();
	}
}

