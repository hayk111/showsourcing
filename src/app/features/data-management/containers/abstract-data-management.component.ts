import { Router } from '@angular/router';
import { OnInit, AfterViewInit } from '@angular/core';
import { GlobalServiceInterface } from '~entity-services/_global/global.service';
import { EntityMetadata } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';

export abstract class AbstractDataManagementComponent<T extends { id?: string },
	G extends GlobalServiceInterface<T>> extends TrackingComponent implements OnInit {

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected viewSrv: ListPageViewService<T>,
		public dataSrv: ListPageDataService<T, G>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService,
		public entityMetadata: EntityMetadata
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

	mergeSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		this.commonDlgSrv.openMergeDialog({ type: this.entityMetadata, entities: items });
	}
}
