import { Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ERM, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		SelectionService,
	]
})
export class ProjectsPageComponent extends ListPageComponent<Project, ProjectFeatureService> {
	filterTypes = [
		FilterType.CREATED_BY
	];

	constructor(
		protected router: Router,
		protected featureSrv: ProjectFeatureService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PROJECT);
	}

}
