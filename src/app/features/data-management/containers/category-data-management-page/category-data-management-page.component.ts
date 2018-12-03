import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { CategoryManagementService } from '~features/data-management/services/category-management.service';
import { ERM, Category, ERM_TOKEN } from '~models';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		getProviders(ProviderKey.CATEGORY, ERM.CATEGORY),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.CATEGORY }
	]
})
export class CategoryDataManagementPageComponent extends AbstractDataManagementComponent<Category, CategoryManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: CategoryManagementService,
		protected viewSrv: ListPageViewService<Category>,
		public dataSrv: ListPageDataService<Category, CategoryManagementService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super(router, featureSrv, viewSrv, dataSrv, selectionSrv, commonDlgSrv, ERM.CATEGORY);
	}

}
