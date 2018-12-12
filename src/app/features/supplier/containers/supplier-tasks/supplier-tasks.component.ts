import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '~common/modals/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task } from '~models';
import { FilterType } from '~shared/filters';

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
		this.listSrv.filterList.addFilter({ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id });
	}

	createTask(name: string) {
		const newTask = new Task({ name, supplier: { id: this.route.parent.snapshot.params.id } });
		this.taskSrv.create(newTask).subscribe(_ => this.listSrv.refetch());
	}
}

