import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService, UserService } from '~global-services';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { AbstractTaskCommonComponent } from '~shared/task-common/containers/abstract-task-common.component';
import { Task } from '~models';

@Component({
	selector: 'supplier-tasks-app',
	templateUrl: './supplier-tasks.component.html',
	styleUrls: ['./supplier-tasks.component.scss']
})
export class SupplierTasksComponent extends AbstractTaskCommonComponent implements OnInit {

	constructor(
		protected route: ActivatedRoute,
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
		this.filterList.addFilter({ type: FilterType.SUPPLIER, value: this.route.parent.snapshot.params.id });
	}

	createTask(name: string) {
		const newTask = new Task({ name, supplier: { id: this.route.parent.snapshot.params.id } });
		this.featureSrv.create(newTask).subscribe(_ => this.refetch());
	}

}

