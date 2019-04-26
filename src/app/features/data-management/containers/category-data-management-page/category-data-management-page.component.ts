import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { CategoryService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { Category, ERM } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'category-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./category-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class CategoryDataManagementPageComponent extends AutoUnsub
	implements OnInit {

	erm = ERM.CATEGORY;

	constructor(
		private categorySrv: CategoryService,
		public listSrv: ListPageService<Category, CategoryService>,
		public commonModalSrv: CommonModalService,
		private dmSrv: DataManagementService
	) {
		super();
	}


	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.CATEGORY,
			entitySrv: this.categorySrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false },
			entityMetadata: ERM.CATEGORY,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const ids = this.listSrv.getSelectedIds();
		this.dmSrv.merge(ids, this.listSrv.entityMetadata);
	}

}
