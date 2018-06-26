import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { Category, ERM } from '~models';
import { CategoryManagementService } from '~features/data-management/services/category-management.service.1';
import { Router } from '@angular/router';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService, DialogName } from '~shared/dialog';

@Component({
	selector: 'app-category-data-management-page',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectionService]
})
export class CategoryDataManagementPageComponent extends ListPageComponent<Category, CategoryManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: CategoryManagementService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.CATEGORY, DialogName.NEW_CATEGORY);
	}

}
