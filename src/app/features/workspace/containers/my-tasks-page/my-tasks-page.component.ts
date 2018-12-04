import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task } from '~models';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { AbstractTaskCommonComponent } from '~common/task/containers/abstract-task-common.component';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class MyTasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

	constructor(

		public route: ActivatedRoute,
		public userSrv: UserService,
		public router: Router,
		public featureSrv: TaskService,
		public viewSrv: ListPageViewService<Task>,
		public dataSrv: ListPageDataService<Task, TaskService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService
	) {
		super(
			router,
			userSrv,
			featureSrv,
			viewSrv,
			dataSrv,
			selectionSrv,
			commonDlgSrv
		);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	// 	search(str: string) {
	// // TODO, POSSIBLE SEARCHING FULL NAME ASSIGNEE
	// 		this.currentSearch = str ? `name CONTAINS[c] "${str}"`
	// 		+ ` OR supplier.name CONTAINS[c] "${str}"`
	// 		+ ` OR product.name CONTAINS[c] "${str}"` : '';
	// 		this.onPredicateChange();
	// 	}
}
