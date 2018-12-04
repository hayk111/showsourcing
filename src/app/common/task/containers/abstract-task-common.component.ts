import { AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends TrackingComponent implements OnInit, AfterViewInit {

	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected taskSrv: TaskService,
		public commonDlgSrv: CommonDialogService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.TASK,
			entitySrv: this.taskSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			initialSortBy: 'name',
			entityMetadata: ERM.TASK
		});
	}

	ngAfterViewInit() {
		this.listSrv.addFilter({ type: FilterType.DONE, value: false });
	}

	toggleMyTasks(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	toggleDoneTasks(show: boolean) {
		if (show) {
			// this.filterList.removeFilterType(FilterType.DUE_DATE);
			this.listSrv.removeFilterType(FilterType.DONE);
		} else {
			// this.filterList.addFilter({ type: FilterType.DUE_DATE, value: toRealmDateFormat(new Date()) });
			this.listSrv.addFilter({ type: FilterType.DONE, value: false });
		}
	}

	updateTask(task: Task) {
		this.listSrv.update(task);
	}

	createTask(name: string) {
		const newTask = new Task({ name });
		this.taskSrv.create(newTask).subscribe(_ => this.listSrv.refetch());
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
