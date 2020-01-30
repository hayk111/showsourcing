import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { CategoryService, TeamService, CompanyService } from '~core/orm/services';
import { SelectionService } from '~core/list-page';
import { SelectParamsConfig } from '~core/orm/services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { Category, ERM } from '~core/orm/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'category-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./category-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		SelectionService
	],
	host: {
		class: 'table-page'
	},
})
export class CategoryDataPageComponent extends AutoUnsub implements OnInit {

	erm = ERM.CATEGORY;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private categorySrv: CategoryService,
		public listSrv: ListPageService<Category, CategoryService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService
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
		this.dialogCommonSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: categories
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
