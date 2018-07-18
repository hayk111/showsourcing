import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ERM, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';


@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		SelectionService,
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_PROJECT }
	]
})
export class ProjectsPageComponent extends ListPageComponent<Project, ProjectFeatureService> {

	constructor(
		protected router: Router,
		protected featureSrv: ProjectFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, ERM.PROJECT);
	}

}
