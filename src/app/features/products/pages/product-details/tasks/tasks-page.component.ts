import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AbstractTaskCommonComponent } from '~common/abstracts/abstract-task-common.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectParams } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService, ProductService } from '~core/erm';
import { Product, Task } from '~core/erm';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

	product: Product;

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		protected productSrv: ProductService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>
	) {
		super(router, route, userSrv, taskSrv, dlgSrv, dialogCommonSrv, listSrv);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.productSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);

		const selectParams = new SelectParams({ sortBy: 'done', descending: false });
		super.setup([
			{ type: FilterType.PRODUCT, value: this.route.parent.snapshot.params.id },
		], selectParams, false);
		super.ngOnInit();
	}

}
