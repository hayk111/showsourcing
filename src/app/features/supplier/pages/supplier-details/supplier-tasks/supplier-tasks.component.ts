import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { Task, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { DialogService } from '~shared/dialog';
import { SupplierFeatureService } from '~features/supplier/services';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss'],
	providers: [
		ListPageService
	]
})
export class SupplierTasksComponent extends AbstractTaskCommonComponent implements OnInit {

	supplier: Supplier;

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		protected featureSrv: SupplierFeatureService,
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(
			router,
			route,
			userSrv,
			taskSrv,
			dlgSrv,
			commonModalSrv,
			listSrv
		);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(supplier => this.supplier = supplier);
		super.setup([
			{ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id },
			{ type: FilterType.DONE, value: true }
		]);
	}

}

