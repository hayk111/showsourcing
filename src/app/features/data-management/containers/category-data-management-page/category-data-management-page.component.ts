import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { CategoryService } from '~core/entity-services';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { Category, ERM } from '~models';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class CategoryDataManagementPageComponent extends AbstractDataManagementComponent
	implements OnInit {

	constructor(
		public router: Router,
		public categorySrv: CategoryService,
		public viewSrv: ListPageViewService<Category>,
		public dataSrv: ListPageDataService<Category, CategoryService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService
	) {
		super(selectionSrv, commonDlgSrv, ERM.CATEGORY);
	}


	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.categorySrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
		this.viewSrv.setup(this.entityMetadata);
	}
}
