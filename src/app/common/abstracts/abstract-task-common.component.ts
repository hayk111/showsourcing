import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TaskCreationDialogComponent } from '~common/dialogs/creation-dialogs';
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
import { Filter, FilterService, FilterType } from '~core/filters';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { ListHelper2Service } from '~core/list-page2';
import { api } from 'showsourcing-api-lib';

/** @deprecated */
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
		public listHelper: ListHelper2Service,
		protected filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
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
		this.listHelper.setup(
			'Task', this._destroy$
		);
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
		this.listHelper.update(task);
	}

	openCreationTaskDlg(product?: Product, supplier?: Supplier) {
		this.dlgSrv
			.open(TaskCreationDialogComponent, { product, supplier });
			// don't implement creation Sample => deprecated component
			// .pipe(
			// 	filter((event: CloseEvent) => event.type === CloseEventType.OK),
			// 	switchMap(_ => this.listSrv.refetch())
			// )
			// .subscribe();
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, id]);
	}
}
