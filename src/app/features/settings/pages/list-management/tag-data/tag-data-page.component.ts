import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService, SelectionService } from '~core/list-page';
import { AutoUnsub } from '~utils';
import { ListHelperService, ListPageViewService } from '~core/list-page2';
import { Observable } from 'rxjs';
import { Tag } from '~core/erm3/models';
import { TeamService, CompanyService } from '~core/auth';
import { FilterService } from '~shared/filters/services/filter.service';
import { Typename } from '~core/erm3/typename.type';

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
	typename: Typename = 'Tag';

	items$: Observable<Tag[]>;

	constructor(
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Tag>,
		public filterSrv: FilterService,
		public listFuseHelper: ListHelperService
	) {
		super();
	}

	ngOnInit() {

		this.listFuseHelper.setup('Product');
		this.items$ = this.listFuseHelper.getFilteredItems$();
	}

	mergeSelected() {
		const tags = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.typename,
			entities: tags
		});
	}

	showItemsPerPage(count: number) {
	}
}
