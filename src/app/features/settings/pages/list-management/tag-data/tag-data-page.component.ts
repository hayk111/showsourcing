import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService, ListFuseHelperService } from '~core/list-page2';
import { Tag } from '~core/erm3/models';
import { TeamService, CompanyService } from '~core/auth';
import { FilterService } from '~core/filters/filter.service';
import { Typename } from '~core/erm3/typename.type';
import { SortService } from '~shared/table/services/sort.service';
import { PaginationService } from '~shared/pagination/services/pagination.service';

@Component({
	selector: 'tag-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./tag-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
		ListPageViewService,
		ListFuseHelperService,
		SortService,
		PaginationService,
	],
	host: {
		class: 'table-page',
	},
})
export class TagDataPageComponent extends AutoUnsub implements OnInit {
	typename: Typename = 'Tag';

	constructor(
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Tag>,
		public filterSrv: FilterService,
		public listHelper: ListFuseHelperService
	) {
		super();
	}

	ngOnInit() {
		let teamId: string;
		this.teamSrv.teamSelected$.subscribe((team) => (teamId = team.id));
		this.viewSrv.setup({
			typename: 'Tag',
			destUrl: 'settings/list-management/tag-data',
			view: 'table',
		});
		// set searchable columns for list-fuse-helper
		this.filterSrv.setup([], ['name']);
		// this.listHelper.setup('Tag');
	}

	mergeSelected() {
		const tags = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.typename,
			entities: tags,
		});
	}

	showItemsPerPage(count: number) {}
}
