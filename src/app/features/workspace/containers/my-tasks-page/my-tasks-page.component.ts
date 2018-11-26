import {
	Component,
	OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~shared/task-common/containers/abstract-task-common.component';
import { Task, ERM } from '~models';
import { ListPageProviders, ProviderKey } from '~shared/list-page/list-page-providers.class';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss'],
	providers: [
		ListPageProviders.getProviders(ProviderKey.TASK, ERM.TASK),
	]
})
export class MyTasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

	constructor(

		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected featureSrv: TaskService,
		protected viewSrv: ListPageViewService<Task>,
		public dataSrv: ListPageDataService<Task, TaskService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
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
