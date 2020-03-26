import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { CompanyService, TeamService } from '~core/auth/services';
import { Category } from '~core/erm3/models';
import { FilterService } from '~core/filters/filter.service';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { Typename } from '~core/erm3/typename.type';
import { FilterType } from '~core/filters';

@Component({
	selector: 'category-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./category-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageViewService, SelectionService, ListFuseHelperService, FilterService],
	host: {
		class: 'table-page'
	}
})
export class CategoryDataPageComponent extends AutoUnsub implements OnInit {
	typename: Typename = 'Category';

	items$: Observable<Category[]>;

	constructor(
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Category>,
		public filterSrv: FilterService,
		public listHelper: ListFuseHelperService
	) {
		super();
	}

	ngOnInit() {
		let teamId: string;
		this.teamSrv.teamSelected$.subscribe(team => (teamId = team.id));
		this.filterSrv.setup([], ['name']);
		this.viewSrv.setup({typename: 'Category', destUrl: 'settings/list-management/category-data', view: 'table'});
		this.listHelper.setup('Category', 'Team', teamId); // search initialized in controller-table
		this.items$ = this.listHelper.filteredItems$;
	}

	mergeSelected() {
		const categories = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.typename,
			entities: categories
		});
	}

	showItemsPerPage(count: number) {}
}
