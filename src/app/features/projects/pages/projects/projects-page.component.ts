import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, Project } from '~core/erm';
import { AutoUnsub } from '~utils';
import { ListHelperService, ListPageViewService, SelectionService, ListFuseHelperService } from '~core/list-page2';
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
		ListFuseHelperService,
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
		public listHelper: ListFuseHelperService,
		public viewSrv: ListPageViewService<any>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('Project');
	}

	create() {
		this.listHelper.create();
		// this.listHelper.create({
		// 	assigneeId: this.userSrv.userId
		// });
	}
}
