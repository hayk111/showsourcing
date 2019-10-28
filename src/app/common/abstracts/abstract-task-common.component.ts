import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CreationTaskDlgComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { Filter, FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends AutoUnsub implements OnInit {
	assigneeFilterType = FilterType.ASSIGNEE;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>,
	) {
		super();
	}

	ngOnInit() {
		this.taskSrv.taskListUpdate$.pipe(
			switchMap(_ => this.listSrv.refetch()),
			takeUntil(this._destroy$)
		).subscribe();
	}

	setup(addedFilters: Filter[]) {
		const userId = this.userSrv.userSync.id;
		const routeId = this.route.parent.snapshot.params.id;
		this.listSrv.setup({
			entitySrv: this.taskSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			selectParams: {
				sortBy: 'creationDate',
				descending: true,
				query: 'deleted == false'
			},
			initialFilters: [
				...addedFilters,
				{ type: FilterType.DONE, value: false }
			],
			entityMetadata: ERM.TASK,
			originComponentDestroy$: this._destroy$
		});
	}

	toggleMyTasks(show: boolean) {
		const userId = this.userSrv.userSync.id;

		const filterAssignee = {
			type: FilterType.ASSIGNEE,
			value: userId
		};
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	toggleDoneTasks(show: boolean) {
		if (show) {
			this.listSrv.removeFilterType(FilterType.DONE);
		} else {
			this.listSrv.addFilter({ type: FilterType.DONE, value: false });
		}
	}

	updateTask(task: Task) {
		this.listSrv.update(task);
	}

	openCreationTaskDlg(product, supplier) {
		this.dlgSrv.open(CreationTaskDlgComponent, { product, supplier });
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, id]);
	}
}
