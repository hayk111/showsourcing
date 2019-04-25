import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task } from '~models';
import { Filter, FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends AutoUnsub {
	assigneeFilterType = FilterType.ASSIGNEE;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected taskSrv: TaskService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super();
	}

	setup(addedFilters: Filter[]) {
		const userId = this.userSrv.userSync.id;
		const routeId = this.route.parent.snapshot.params.id;
		this.listSrv.setup({
			key: `${ListPageKey.TASK}-${routeId}`,
			entitySrv: this.taskSrv,
			searchedFields: ['name', 'supplier.name', 'product.name'],
			selectParams: {
				sortBy: 'creationDate',
				descending: true
			},
			initialFilters: [
				{ type: FilterType.DONE, value: false },
				...addedFilters
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

	createTask(name: string) {
		const newTask = new Task({ name, assignee: { id: this.userSrv.userSync.id } });
		this.taskSrv.create(newTask).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
