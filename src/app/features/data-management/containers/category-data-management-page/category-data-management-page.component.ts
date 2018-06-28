import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryManagementService } from '~features/data-management/services/category-management.service.1';
import { Category, ERM } from '~models';
import { DialogService } from '~shared/dialog';
import { CreationDialogComponent } from '~shared/generic-dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FilterService } from '~shared/filters';
import { StoreKey } from '~utils';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_CATEGORY },
		SelectionService
	]
})
export class CategoryDataManagementPageComponent extends ListPageComponent<Category, CategoryManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: CategoryManagementService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.CATEGORY, CreationDialogComponent);
	}
	renameEntity(categoryId: string) {

	}

}
