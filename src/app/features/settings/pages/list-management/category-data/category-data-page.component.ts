import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	Category,
	CategoryService,
	CompanyService,
	ERM,
	SelectParamsConfig,
	TeamService
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'category-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: [
		'./category-data-page.component.scss',
		'../shared/list-management-styles.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService, SelectionService, ListPageViewService],
	host: {
		class: 'table-page'
	}
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
		public selectionSrv: SelectionService,
		private viewSrv: ListPageViewService<Category>
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.categorySrv,
			searchedFields: ['name'],
			selectParams: {
				sortBy: 'name',
				descending: false,
				query: 'deleted == false'
			},
			entityMetadata: ERM.CATEGORY,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const categories = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.entityMetadata,
			entities: categories
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
