import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AbstractTaskCommonComponent } from '~common/abstracts/abstract-task-common.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { SupplierService, TaskService, UserService } from '~core/ORM/services';
import { ERM, Supplier, Task } from '~core/ORM/models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [ListPageService],
	host: { class: 'table-page' }
})
export class TasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

	supplier: Supplier;
	erm = ERM;
	filterTypes = [
		FilterType.DONE
	];

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		protected supplierSrv: SupplierService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(
			router,
			route,
			userSrv,
			taskSrv,
			dlgSrv,
			dialogCommonSrv,
			listSrv
		);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.supplierSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(supplier => this.supplier = supplier);

		super.setup([
			{ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id },
			{ type: FilterType.DONE, value: true }
		]);

		super.ngOnInit();
	}

}

