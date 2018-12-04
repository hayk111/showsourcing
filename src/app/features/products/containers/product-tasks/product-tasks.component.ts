import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { TaskService, UserService } from '~entity-services';
import { Task } from '~models';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService]
})

export class ProductTasksComponent extends AbstractTaskCommonComponent
	implements OnInit {
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
		// this.filterList.addFilter({
		// 	type: FilterType.PRODUCT,
		// 	value: this.route.parent.snapshot.params.id
		// });
	}

	createTask(name: string) {
		const newTask = new Task({
			name,
			product: { id: this.route.parent.snapshot.params.id }
		});
		this.featureSrv.create(newTask).subscribe();
		this.dataSrv.refetch();
	}

	// search(str: string) {
	// 	// TODO, POSSIBLE SEARCHING FULL NAME ASSIGNEE
	// 	this.currentSearch = str
	// 		? `name CONTAINS[c] "${str}"` +
	// 			` OR supplier.name CONTAINS[c] "${str}"` +
	// 			` OR product.name CONTAINS[c] "${str}"`
	// 		: '';
	// 	this.onPredicateChange();
	// }
}
