import { Component } from '@angular/core';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { Project, ERM } from '~models';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FilterService } from '~shared/filters';
import { StoreKey } from '~utils/store/store';
import { Router } from '@angular/router';
import { DialogService } from '~shared/dialog';


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
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, ERM.PROJECT, ProjectsPageComponent);
	}

}
