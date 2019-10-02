import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractTaskCommonComponent } from '~common/task';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task, Product } from '~models';
import { FilterType } from '~shared/filters';
import { DialogService } from '~shared/dialog';
import { ProductFeatureService } from '~features/products/services';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ProductTasksComponent extends AbstractTaskCommonComponent
	implements OnInit {

	erm = ERM.TASK;
	product: Product;

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		protected featureSrv: ProductFeatureService,
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
			listSrv,
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
		).subscribe(product => this.product = product);
		super.setup([
			{ type: FilterType.PRODUCT, value: this.route.parent.snapshot.params.id },
			{ type: FilterType.DONE, value: true },
		]);
		super.ngOnInit();
	}

	createTask(name: string) {
		const newTask = new Task({
			name,
			product: { id: this.route.parent.snapshot.params.id },
			assignee: { id: this.userSrv.userSync.id }
		});
		this.taskSrv.create(newTask).pipe(
			switchMap(_ => this.listSrv.refetch({}))
		).subscribe();
	}

}
