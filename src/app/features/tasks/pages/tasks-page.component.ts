import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { TasksTableComponent } from '~common/tables/tasks-table/tasks-table.component';
import {
	ERM,
	SelectParamsConfig,
	Task,
	TaskService,
	UserService
} from '~core/erm';
import { ListPageService } from '~core/list-page';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [ListPageService, DialogCommonService],
	host: {
		class: 'table-page'
	}
})
export class TasksPageComponent extends AutoUnsub
	implements OnInit, AfterViewInit {
	public tableWidth: string;

	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.CREATED_BY,
		FilterType.PROJECTS,
		FilterType.SUPPLIER
	];
	columns = TasksTableComponent.DEFAULT_COLUMNS;
	tableConfig = TasksTableComponent.DEFAULT_TABLE_CONFIG;

	tasksCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>,
		private taskSrv: TaskService,
		public elem: ElementRef,
		protected dlgSrv: DialogService,
		private userSrv: UserService,
		private filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.taskSrv,
			searchedFields: [
				'name',
				'reference',
				'assignee.firstName',
				'createdBy.firstName',
				'product.name',
				'supplier.name'
			],
			entityMetadata: ERM.TASK,
			initialFilters: [
				{ type: FilterType.DONE, value: false },
				{ type: FilterType.ARCHIVED, value: false }
			],
			originComponentDestroy$: this._destroy$
		});

		this.tasksCount$ = this.filterSrv.filterList.valueChanges$.pipe(
			switchMap(_ =>
				this.taskSrv
					.selectCount(this.filterSrv.filterList.asPredicate())
					.pipe(takeUntil(this._destroy$))
			)
		);

		this.taskSrv.taskListUpdate$
			.pipe(switchMap(_ => this.listSrv.refetch()))
			.subscribe();
	}

	ngAfterViewInit() {
		// this way the check is active, and user can see that this filter is being used
		// this.controller.toggleAssigned();
	}

	showTasksCreatedByMeOnly() {
		const predicate = this.filterSrv.filterList.asPredicate();
		const query = `${predicate && predicate + ' AND '} (createdBy.id == "${
			this.userSrv.userSync.id
		}")`;

		this.listSrv
			.refetch({
				query
			})
			.subscribe();
	}

	hideTasksCreatedByMeOnly() {
		this.listSrv.refetch().subscribe();
	}

	toggleMyProducts(show: boolean) {
		const filterAssignee = {
			type: FilterType.ASSIGNEE,
			value: this.userSrv.userSync.id
		};
		if (show) this.filterSrv.addFilter(filterAssignee);
		else this.filterSrv.removeFilter(filterAssignee);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
