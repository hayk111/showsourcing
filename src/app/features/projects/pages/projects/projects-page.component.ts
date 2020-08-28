import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Project } from '~core/erm3/models';
import { AutoUnsub } from '~utils';
import { ListPageViewService, SelectionService, ListHelper2Service } from '~core/list-page2';
import { UserService } from '~core/auth/services';
import { FilterService, FilterType } from '~core/filters';

// Doctor: You're obese.
// -
// Patient: For that I definitely want a second opinion.
// -
// Doctor: You’re quite ugly, too.

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		ListHelper2Service,
		FilterService,
		ListPageViewService,
		SelectionService,
	],
	host: {
		class: 'table-page'
	}
})
export class ProjectsPageComponent extends AutoUnsub implements OnInit {
	items$: Observable<Project[]>;

	filterTypes = [FilterType.CREATED_BY];

	constructor(
		public filterSrv: FilterService,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Project', this._destroy$);
	}

	create() {
		this.listHelper.openCreationDialog();
		// this.listHelper.openCreationDialog({
		// 	assigneeId: this.userSrv.userId
		// });
	}
}
