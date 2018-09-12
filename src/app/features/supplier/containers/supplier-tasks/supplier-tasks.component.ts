import { Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { AbstractTaskCommonComponent } from '~shared/task-common/containers/abstract-task-common.component';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss']
})
export class SupplierTasksComponent extends AbstractTaskCommonComponent {

	constructor(
		protected userSrv: UserService,
		protected router: Router,
		protected featureSrv: TaskService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, userSrv, featureSrv, searchSrv, selectionSrv, dlgSrv, moduleRef);
	}

	createTask(name: string) {
		// override with the task created and this supplier
	}

}

