import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ProjectService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ERM, Project } from '~models';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';

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
		ListPageService
	]
})
export class ProjectsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	filterTypes = [FilterType.CREATED_BY];
	erm = ERM.PROJECT;

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private projectSrv: ProjectService,
		public listSrv: ListPageService<Project, ProjectService>,
		public commonModalSrv: CommonModalService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PROJECTS,
			entitySrv: this.projectSrv,
			searchedFields: ['name', 'createdBy.firstName', 'createdBy.lastName'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: ERM.PROJECT,
		}, false);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}
}
