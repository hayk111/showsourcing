import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ProjectFeatureService } from '~features/project/services/project-feature.service';
import { ERM, Project } from '~models';
import { FilterType } from '~shared/filters';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'projects-page-app',
	templateUrl: './projects-page.component.html',
	styleUrls: ['./projects-page.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class ProjectsPageComponent extends TrackingComponent implements OnInit {
	filterTypes = [FilterType.CREATED_BY];

	constructor(
		public router: Router,
		public featureSrv: ProjectFeatureService,
		public viewSrv: ListPageViewService<Project>,
		public dataSrv: ListPageDataService<Project, ProjectFeatureService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService,
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
		this.viewSrv.setup(ERM.PROJECT);
	}
}
