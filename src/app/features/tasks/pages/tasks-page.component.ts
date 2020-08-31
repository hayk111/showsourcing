import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksTableComponent } from '~common/tables/tasks-table/tasks-table.component';
import {
	ERM,
	SelectParamsConfig
} from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListHelper2Service,
		SelectionService,
		FilterService,
		ListPageViewService
	],
	host: {
		class: 'table-page'
	}
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	public tableWidth: string;

	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.CREATED_BY,
		FilterType.PROJECT,
		FilterType.SUPPLIER
	];
	columns = TasksTableComponent.DEFAULT_COLUMNS;
	tableConfig = TasksTableComponent.DEFAULT_TABLE_CONFIG;

	tasksCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public filterSrv: FilterService,
		public selectionSrv: SelectionService,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Task', this._destroy$);
		this.viewSrv.setup({ typename: 'Task', destUrl: 'tasks', view: 'table' });
	}


	showTasksCreatedByMeOnly() {
		// const predicate = this.filterSrv.filterList.asPredicate();
		// const query = `${predicate && predicate + ' AND '} (createdBy.id == "${
		// 	this.userSrv.userSync.id
		// }")`;

		// this.listSrv
		// 	.refetch({
		// 		query
		// 	})
		// 	.subscribe();
	}

	hideTasksCreatedByMeOnly() {
		// this.listSrv.refetch().subscribe();
	}

	toggleMyProducts(show: boolean) {
		// const filterAssignee = {
		// 	type: FilterType.ASSIGNEE,
		// 	value: this.userSrv.userSync.id
		// };
		// if (show) this.filterSrv.addFilter(filterAssignee);
		// else this.filterSrv.removeFilter(filterAssignee);
	}

	showItemsPerPage(count: number) {
		// this.selectItemsConfig = { take: Number(count) };
		// this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
