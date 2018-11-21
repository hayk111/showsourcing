import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { Project } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent extends TrackingComponent implements OnInit {
	filterTypes = [FilterType.CREATED_BY];

	constructor(
		protected router: Router,
		protected featureSrv: ProjectFeatureService,
		protected viewSrv: ListPageViewService<Project>,
		public dataSrv: ListPageDataService<Project, ProjectFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: DialogService,
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
