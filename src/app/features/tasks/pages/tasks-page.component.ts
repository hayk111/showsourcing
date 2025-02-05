import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { TaskService, UserService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { ControllerListComponent } from '~shared/header/components/controller-list/components/controller-list/controller-list.component';
import { AutoUnsub } from '~utils';
import { QueryBuilder } from '~core/entity-services/_global/query-builder.class';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListPageService,
		DialogCommonService
	]
})
export class TasksPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	@ViewChild(ControllerListComponent, { static: false }) controller: ControllerListComponent;
	public tableWidth: string;

	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	tasksCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>,
		private taskSrv: TaskService,
		public elem: ElementRef,
		protected dlgSrv: DialogService,
		private userSrv: UserService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.taskSrv,
			searchedFields: ['name', 'reference', 'assignee.firstName', 'createdBy.firstName', 'product.name', 'supplier.name'],
			entityMetadata: ERM.TASK,
			initialFilters: [{ type: FilterType.DONE, value: false }],
			originComponentDestroy$: this._destroy$
		});

		this.tasksCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.taskSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);

	}

	ngAfterViewInit() {
		// this way the check is active, and user can see that this filter is being used
		this.controller.toggleAssigned();
	}

	showTasksCreatedByMeOnly() {
		const predicate = this.listSrv.filterList.asPredicate();
		const query = `${predicate && predicate + ' AND '} (createdBy.id == "${this.userSrv.userSync.id}")`;

		this.listSrv.refetch({
			query
		}).subscribe();
	}

	hideTasksCreatedByMeOnly() {
		this.listSrv.refetch().subscribe();
	}

	toggleMyProducts(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	onViewChange(view: 'list' | 'card') {
		this.listSrv.changeView(view);
	}

	onFavourite(task: Task) {
		this.listSrv.onItemFavorited(task.id);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onExport() {
		this.dialogCommonSrv.openExportDialog(undefined);
	}

}
