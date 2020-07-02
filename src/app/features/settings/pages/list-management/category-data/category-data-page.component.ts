import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { CompanyService, TeamService } from '~core/auth/services';
import { Category } from '~core/erm3/models';
import { FilterService } from '~core/filters/filter.service';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { Typename } from '~core/erm3/typename.type';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';

@Component({
	selector: 'category-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./category-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageViewService,
		SelectionService,
		ListHelper2Service,
		FilterService,
		PaginationService,
		SortService,
	],
	host: {
		class: 'table-page',
	},
})
export class CategoryDataPageComponent extends AutoUnsub implements OnInit {
	typename: Typename = 'Category';

	constructor(
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Category>,
		public filterSrv: FilterService,
		public listHelper: ListHelper2Service
	) {
		super();
	}

	ngOnInit() {
		let teamId: string;
		this.teamSrv.teamSelected$.subscribe((team) => (teamId = team.id));
		this.viewSrv.setup({
			typename: 'Category',
			destUrl: 'settings/list-management/category-data',
			view: 'table',
		});
		// set searchable columns for list-fuse-helper
		this.filterSrv.setup([], ['name']);
		// this.listHelper.setup('Category');
	}

	mergeSelected() {
		const categories = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.typename,
			entities: categories,
		});
	}

	showItemsPerPage(count: number) {}
}
