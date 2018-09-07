import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef, EventEmitter, Output } from '@angular/core';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Task, ERM } from '~models';
import { Router } from '@angular/router';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService } from '~shared/dialog';
import { CreateTaskDialogComponent } from '~shared/task/components/create-task-dialog/create-task-dialog.component';
import { TaskService } from '~global-services';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTasksComponent extends ListPageComponent<Task, TaskService> implements OnInit {

	@Output() unselect = new EventEmitter();
	@Output() select = new EventEmitter();

	constructor(
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TASK, CreateTaskDialogComponent);
	}
	ngOnInit() {
	}

	toggleFilter(show: boolean) {
		// implement filter to show only my tasks
	}

}
