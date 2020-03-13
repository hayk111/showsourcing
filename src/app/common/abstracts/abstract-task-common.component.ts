import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CreationTaskDlgComponent } from '~common/dialogs/creation-dialogs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	Product,
	SelectParams,
	Supplier,
	Task,
	TaskService,
	UserService
} from '~core/erm';
import { ListPageService } from '~core/list-page';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { Filter, FilterType, FilterService } from '~core/filters';
import { AutoUnsub } from '~utils';

/** since we use the task component on different pages, this page will keep the methods clean */
export abstract class AbstractTaskCommonComponent extends AutoUnsub
	implements OnInit {
	assigneeFilterType = FilterType.ASSIGNEE;

	constructor(
		protected router: Router,
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>,
		protected filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.taskSrv.taskListUpdate$
			.pipe(
				switchMap(_ => this.listSrv.refetch()),
				takeUntil(this._destroy$)
			)
			.subscribe();
	}

	setup(
		addedFilters: Filter[],
		selectParams?: SelectParams,
		hasDoneFilter = true
	) {
		const userId = this.userSrv.userSync.id;
		const routeId = this.route.parent.snapshot.params.id;
		const initialFilters: Filter[] = [
			{ type: FilterType.ARCHIVED, value: false }
		];
		if (hasDoneFilter) {
			initialFilters.push({ type: FilterType.DONE, value: false });
		}

		this.filterSrv.setup([...initialFilters, ...addedFilters], ['name', 'supplier.name', 'product.name', 'reference']);
		this.listSrv.setup({
			entitySrv: this.taskSrv,
			selectParams: {
				...selectParams,
				query: 'deleted == false AND archived == false'
			},
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
		if (show) this.filterSrv.addFilter(filterAssignee);
		else this.filterSrv.removeFilter(filterAssignee);
	}

	toggleDoneTasks(show: boolean) {
		if (show) {
			this.filterSrv.removeFilterType(FilterType.DONE);
		} else {
			this.filterSrv.addFilter({ type: FilterType.DONE, value: false });
		}
	}

	toggleUpdateDone(task: Task) {
		this.updateTask({ id: task.id, done: !task.done } as Task);
	}

	updateTask(task: Task) {
		this.listSrv.update(task);
	}

	openCreationTaskDlg(product?: Product, supplier?: Supplier) {
		this.dlgSrv
			.open(CreationTaskDlgComponent, { product, supplier })
			.pipe(
				filter((event: CloseEvent) => event.type === CloseEventType.OK),
				switchMap(_ => this.listSrv.refetch())
			)
			.subscribe();
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, id]);
	}
}
