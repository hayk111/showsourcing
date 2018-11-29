import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { Project, ERM_TOKEN, ERM } from '~models';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { FilterType } from '~shared/filters';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { ListPageProviders } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		ListPageProviders.getProviders('projects-page', ERM.PROJECT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PROJECT }]
})
export class ProjectsPageComponent extends TrackingComponent implements OnInit {
	filterTypes = [FilterType.CREATED_BY];

	constructor(
		protected router: Router,
		protected featureSrv: ProjectFeatureService,
		protected viewSrv: ListPageViewService<Project>,
		public dataSrv: ListPageDataService<Project, ProjectFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		protected thumbSrv: ThumbService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}
}
