import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { TagService, TeamService, CompanyService } from '~core/erm';
import { SelectParamsConfig } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { SelectionService } from '~core/list-page';
import { ERM, Tag } from '~core/erm';
import { AutoUnsub } from '~utils';
import { PaginationService } from '~shared/pagination/services/pagination.service';

@Component({
	selector: 'tag-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./tag-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		SelectionService
	],
	host: {
		class: 'table-page'
	},
})
export class TagDataPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.TAG;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private tagSrv: TagService,
		private paginationSrv: PaginationService,
		public listSrv: ListPageService<Tag, TagService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.tagSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: this.erm,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const tags = this.listSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: tags
		});
	}

	showItemsPerPage(count: number) {
		this.paginationSrv.setPerPageItems(count);
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
