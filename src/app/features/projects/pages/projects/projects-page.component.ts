import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProjectService } from '~core/erm';
import { SelectParams, SelectParamsConfig } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { ERM, Project } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { ProjectsTableComponent } from '~common/tables/projects-table/projects-table.component';
import { PaginationService } from '~shared/pagination/services/pagination.service';

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
	],
	host: {
		class: 'table-page'
	}
})
export class ProjectsPageComponent extends AutoUnsub implements OnInit, AfterViewInit {
	filterTypes = [FilterType.CREATED_BY];
	erm = ERM.PROJECT;

	selectItemsConfig: SelectParamsConfig;
	columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;

	constructor(
		private projectSrv: ProjectService,
		private paginationSrv: PaginationService,
		public listSrv: ListPageService<Project, ProjectService>,
		public dialogCommonSrv: DialogCommonService,
	) {
		super();
	}

	ngOnInit() {
		const selectParams = new SelectParams({ query: 'deleted == false' });
		this.listSrv.setup({
			entitySrv: this.projectSrv,
			searchedFields: ['name', 'createdBy.firstName', 'createdBy.lastName'],
			selectParams,
			entityMetadata: ERM.PROJECT,
		}, false);
	}

	showItemsPerPage(count: number) {
		this.paginationSrv.setPerPageItems(count);
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	ngAfterViewInit() {
		this.listSrv.loadData(this._destroy$);
	}
}
