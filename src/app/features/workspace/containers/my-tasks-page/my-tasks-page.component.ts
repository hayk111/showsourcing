import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { AbstractTaskCommonComponent } from '~shared/task-common/containers/abstract-task-common.component';

@Component({
	selector: 'workspace-my-tasks-page-app',
	templateUrl: './my-tasks-page.component.html',
	styleUrls: ['./my-tasks-page.component.scss']
})
export class MyTasksPageComponent extends AbstractTaskCommonComponent implements OnInit {

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

	ngOnInit() {
		super.ngOnInit();
	}

	search(str: string) {
// TODO, POSSIBLE SEARCHING FULL NAME ASSIGNEE
		this.currentSearch = str ? `name CONTAINS[c] "${str}"`
		+ ` OR supplier.name CONTAINS[c] "${str}"`
		+ ` OR product.name CONTAINS[c] "${str}"` : '';
		this.onPredicateChange();
	}
}
