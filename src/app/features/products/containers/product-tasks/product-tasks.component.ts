import { AfterViewInit, ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '~global-services';
import { ERM, Task } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { CreateTaskDialogComponent } from '~shared/task/components/create-task-dialog/create-task-dialog.component';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTasksComponent extends ListPageComponent<Task, TaskService> implements OnInit, AfterViewInit {

	constructor(
		private route: ActivatedRoute,
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK, CreateTaskDialogComponent);
	}

	ngAfterViewInit() {
		this.filterList.addFilter({ type: FilterType.PRODUCT, value: this.route.parent.snapshot.params.id });
	}

}
