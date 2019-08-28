import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList, OnChanges, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FilterType } from '~shared/filters';
import { CommonModalService } from '~common/modals';
import { UserService, TaskService } from '~core/entity-services';
import { ListPageService, ListPageKey } from '~core/list-page';
import { ERM, Task } from '~models';
import { CreationTaskDlgComponent } from '~common/modals';
import { AutoUnsub } from '~utils';
import { DialogService } from '~shared/dialog';
import { NotificationService } from '~shared/notifications';
import { SupplierRequestDialogComponent } from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { SelectParams } from '~core/entity-services/_global/select-params';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListPageService,
		CommonModalService
	]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
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
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Task, TaskService>,
		private taskSrv: TaskService,
		public elem: ElementRef,
		protected dlgSrv: DialogService,
		private userSrv: UserService,
	) {
		super();
	}

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'name' });
		this.listSrv.setup({
			key: ListPageKey.TASK,
			entitySrv: this.taskSrv,
			searchedFields: ['name'],
			entityMetadata: ERM.TASK,
			initialFilters: [],
			originComponentDestroy$: this._destroy$,
			selectParams
		});

		this.tasksCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.taskSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);
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
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onExport() {
		this.commonModalSrv.openExportDialog(this.listSrv.getSelectedValues());
	}
}
