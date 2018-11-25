import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { CategoryManagementService } from '~features/data-management/services/category-management.service';
import { ERM, Category } from '~models';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { ListPageProviders, ProviderKey } from '~shared/list-page/list-page-providers.class';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.CATEGORY, ERM.CATEGORY),
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
