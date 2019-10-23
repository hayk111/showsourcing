import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { CategoryService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { Category, ERM } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'category-data-page-app',
	templateUrl: '../shared/data-management-template.html',
	styleUrls: ['./category-data-page.component.scss', '../shared/data-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class CategoryDataPageComponent extends AutoUnsub implements OnInit {

	erm = ERM.CATEGORY;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private categorySrv: CategoryService,
		public listSrv: ListPageService<Category, CategoryService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.categorySrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: ERM.CATEGORY,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const categories = this.listSrv.getSelectedValues();
		this.commonModalSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: categories
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
