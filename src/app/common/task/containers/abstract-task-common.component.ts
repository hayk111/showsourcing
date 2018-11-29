import { AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { ERM, Task } from '~models';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { FilterType } from '~shared/filters';
import { ListPageDataService } from '~core/list-page';
import { ListPageViewService } from '~core/list-page';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends TrackingComponent implements OnInit, AfterViewInit {

	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected featureSrv: TaskService,
		protected viewSrv: ListPageViewService<Task>,
		public dataSrv: ListPageDataService<Task, TaskService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}

	ngAfterViewInit() {
		this.dataSrv.filterList.addFilter({ type: FilterType.DONE, value: false });
	}

	toggleMyTasks(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.dataSrv.filterList.addFilter(filterAssignee);
		else
			this.dataSrv.filterList.removeFilter(filterAssignee);
	}

	toggleDoneTasks(show: boolean) {
		if (show) {
			// this.filterList.removeFilterType(FilterType.DUE_DATE);
			this.dataSrv.filterList.removeFilterType(FilterType.DONE);
		} else {
			// this.filterList.addFilter({ type: FilterType.DUE_DATE, value: realmDateFormat(new Date()) });
			this.dataSrv.filterList.addFilter({ type: FilterType.DONE, value: false });
		}
	}

	updateTask(task: Task) {
		this.dataSrv.update(task);
	}

	createTask(name: string) {
		const newTask = new Task({ name });
		this.featureSrv.create(newTask).subscribe(_ => this.dataSrv.refetch());
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
