import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AbstractTaskCommonComponent } from '~common/abstracts/abstract-task-common.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	Supplier,
	SupplierService,
	Task,
	TaskService,
	UserService
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { FilterService, FilterType } from '~core/filters';
import { DialogService } from '~shared/dialog';
import { ListHelperService, ListPageViewService } from '~core/list-page2';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListHelperService,
		SelectionService,
		FilterService,
		ListPageViewService
	],
	host: { class: 'table-page' }
})
export class TasksPageComponent implements OnInit {
	supplier: Supplier;
	filterTypes = [FilterType.DONE];

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelperService,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public filterSrv: FilterService
	) {
	}

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		this.supplier = { id: supplierId };
		this.filterSrv.setup([{ type: FilterType.SUPPLIER, value: supplierId }]);
		this.listHelper.setup('Task');
	}
}
