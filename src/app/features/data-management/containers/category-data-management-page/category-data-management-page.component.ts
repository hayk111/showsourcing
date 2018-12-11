import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { CategoryService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { Category, ERM } from '~models';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class CategoryDataManagementPageComponent
	implements OnInit {

	erm = ERM.CATEGORY;

	constructor(
		private categorySrv: CategoryService,
		public listSrv: ListPageService<Category, CategoryService>,
		public commonDlgSrv: CommonDialogService,
		private dmSrv: DataManagementService
	) { }


	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.CATEGORY,
			entitySrv: this.categorySrv,
			searchedFields: ['name'],
			currentSort: { sortBy: 'name', descending: false },
			entityMetadata: ERM.CATEGORY
		});
	}

	mergeSelected() {
		const ids = this.listSrv.getSelectedIds();
		this.dmSrv.merge(ids, this.listSrv.entityMetadata);
	}

}
