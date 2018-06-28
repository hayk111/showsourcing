import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryManagementService } from '~features/data-management/services/category-management.service.1';
import { Category, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { CreationDialogComponent } from '~shared/generic-dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

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
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.CATEGORY, CreationDialogComponent, 'settings/data/category');
	}
	renameEntity(categoryId: string) {

	}

}
