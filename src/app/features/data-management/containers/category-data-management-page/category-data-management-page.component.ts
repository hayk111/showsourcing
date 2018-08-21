import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { CategoryManagementService } from '~features/data-management/services/category-management.service';
import { Category, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		SelectionService
	]
})
export class CategoryDataManagementPageComponent extends AbstractDataManagementComponent<Category, CategoryManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: CategoryManagementService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.CATEGORY);
	}

}
