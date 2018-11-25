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
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageProviders } from '~shared/list-page/list-page-providers.class';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';

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
			searchedFields: ['name', 'supplier.name', 'category.name'],
			initialSortBy: 'category.name'
		});
		this.dataSrv.init();
	}

	ngAfterViewInit() {
		// this.filterList.addFilter({ type: FilterType.DONE, value: false });
	}

	// toggleMyTasks(show: boolean) {
	// 	const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
	// 	if (show)
	// 		this.filterList.addFilter(filterAssignee);
	// 	else
	// 		this.filterList.removeFilter(filterAssignee);
	// }

	// toggleDoneTasks(show: boolean) {
	// 	if (show) {
	// 		// this.filterList.removeFilterType(FilterType.DUE_DATE);
	// 		this.filterList.removeFilterType(FilterType.DONE);
	// 	} else {
	// 		// this.filterList.addFilter({ type: FilterType.DUE_DATE, value: realmDateFormat(new Date()) });
	// 		this.filterList.addFilter({ type: FilterType.DONE, value: false });
	// 	}
	// }

	// updateTask(task: Task) {
	// 	this.update(task);
	// }

	// createTask(name: string) {
	// 	const newTask = new Task({ name });
	// 	this.featureSrv.create(newTask).subscribe(_ => this.refetch());
	// }

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
