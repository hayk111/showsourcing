import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { TaskService, UserService } from '~entity-services';
import { ERM, Task, Product } from '~models';
import { FilterType } from '~shared/filters';
import { DialogService } from '~shared/dialog';
import { ProductFeatureService } from '~features/products/services';
import { AbstractTaskCommonComponent } from '~common/abstracts/abstract-task-common.component';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TasksPageComponent extends AbstractTaskCommonComponent
	implements OnInit {

	erm = ERM;
	product: Product;
	filterTypes = [
		FilterType.DONE
	];

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected taskSrv: TaskService,
		protected dlgSrv: DialogService,
		protected featureSrv: ProductFeatureService,
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
			{ type: FilterType.DONE, value: false },
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
