import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef, AfterViewInit } from '@angular/core';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Task, ERM } from '~models';
import { TaskService, UserService } from '~global-services';
import { Router } from '@angular/router';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { realmDateFormat } from '~utils/realm-date-format.util';
import { TaskQueries } from '~global-services/task/task.queries';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends ListPageComponent<Task, TaskService> implements OnInit, AfterViewInit {

	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK);
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
	}

	updateTask(task: Task) {
		this.update(task, TaskQueries.one);
	}

	createTask(name: string) {
		const newTask = new Task({ name });
		this.featureSrv.create(newTask).subscribe(_ => this.refetch());
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
