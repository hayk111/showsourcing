import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	CompanyService,
	ERM,
	SelectParamsConfig,
	Tag,
	TagService,
	TeamService
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { AutoUnsub } from '~utils';
import { FilterService } from '~shared/filters/services/filter.service';

@Component({
	selector: 'tag-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: [
		'./tag-data-page.component.scss',
		'../shared/list-management-styles.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService, SelectionService, ListPageViewService],
	host: {
		class: 'table-page'
	}
})
export class TagDataPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.TAG;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private tagSrv: TagService,
		public listSrv: ListPageService<Tag, TagService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Tag>,
		public filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.tagSrv,
			searchedFields: ['name'],
			selectParams: {
				sortBy: 'name',
				descending: false,
				query: 'deleted == false'
			},
			entityMetadata: this.erm,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const tags = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.entityMetadata,
			entities: tags
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
