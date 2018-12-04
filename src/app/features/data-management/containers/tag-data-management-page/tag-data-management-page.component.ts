import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { TagService } from '~core/entity-services';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { ERM, Tag } from '~models';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class TagDataManagementPageComponent extends AbstractDataManagementComponent
	implements OnInit {

	constructor(
		public router: Router,
		public tagSrv: TagService,
		public viewSrv: ListPageViewService<Tag>,
		public dataSrv: ListPageDataService<Tag, TagService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService
	) {
		super(selectionSrv, commonDlgSrv, ERM.TAG);
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.tagSrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
		this.viewSrv.setup(this.entityMetadata);
	}
}
