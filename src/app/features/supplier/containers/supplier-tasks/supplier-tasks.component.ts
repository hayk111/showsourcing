import {
	Component,
	OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, UserService } from '~entity-services';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { Task, ERM } from '~models';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss'],
	providers: [
		getProviders(ProviderKey.SUPPLIER_TASK, ERM.TASK),
	]
})
export class SupplierTasksComponent extends AbstractTaskCommonComponent implements OnInit {

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
		this.dataSrv.filterList.addFilter({ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id });
	}

	createTask(name: string) {
		const newTask = new Task({ name, supplier: { id: this.route.parent.snapshot.params.id } });
		this.featureSrv.create(newTask).subscribe(_ => this.dataSrv.refetch());
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

