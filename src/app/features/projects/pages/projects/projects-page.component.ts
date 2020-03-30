import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, Project } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { UserService } from '~core/erm';

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
		ListHelperService,
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
		public listHelper: ListHelperService,
		public viewSrv: ListPageViewService<any>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		private userSrv: UserService
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Project');
		this.items$ = this.listHelper.filteredItems$;
	}

	create() {
		this.listHelper.create({
			assigneeId: this.generateUuid() // TODO: change to use dynamic id from user service, currently service doen't work
		});
	}

	generateUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

}
