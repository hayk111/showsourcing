import { Component, NgModuleRef, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { ERM, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { CreateTaskDialogComponent } from '~shared/task/components/create-task-dialog/create-task-dialog.component';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss']
})
export class SupplierTasksComponent extends ListPageComponent<Task, TaskService> implements OnInit, AfterViewInit {

	constructor(
		private userSrv: UserService,
		private route: ActivatedRoute,
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK, CreateTaskDialogComponent);
	}

	ngAfterViewInit() {
		this.filterList.addFilter({ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id });
	}

	toggleFilter(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show) {
			this.filterList.addFilter(filterAssignee);
		} else {
			this.filterList.removeFilter(filterAssignee);
		}
	}
}