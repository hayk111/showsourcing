import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Product, ERM } from '~models';
import { ProductFeatureService } from '~shared/product/services/product-feature.service';
import { Router } from '@angular/router';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService } from '~shared/dialog';
import { CreateTaskDialogComponent } from '~shared/task/components/create-task-dialog/create-task-dialog.component';

@Component({
	selector: 'product-tasks-app',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTasksComponent extends ListPageComponent<Product, ProductFeatureService> implements OnInit {

	constructor(
		protected router: Router,
		protected featureSrv: ProductFeatureService,
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
