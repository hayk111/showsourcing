import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/modals';
import { ProjectService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Project } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		ListPageService
	]
})
export class ProjectsPageComponent extends TrackingComponent implements OnInit {
	filterTypes = [FilterType.CREATED_BY];
	erm = ERM.PROJECT;

	constructor(
		private projectSrv: ProjectService,
		public listSrv: ListPageService<Project, ProjectService>,
		public commonDlgSrv: CommonDialogService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PROJECTS,
			entitySrv: this.projectSrv,
			searchedFields: ['name'],
			currentSort: { sortBy: 'name', descending: false },
			entityMetadata: ERM.PROJECT
		});
	}
}
