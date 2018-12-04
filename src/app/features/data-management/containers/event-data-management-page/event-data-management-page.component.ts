import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { EventService } from '~core/entity-services';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { ERM, Event } from '~models';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class EventDataManagementPageComponent extends AbstractDataManagementComponent
	implements OnInit {

	constructor(
		protected router: Router,
		protected eventSrv: EventService,
		protected viewSrv: ListPageViewService<Event>,
		public dataSrv: ListPageDataService<Event, EventService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super(selectionSrv, commonDlgSrv, ERM.EVENT);
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.eventSrv,
			searchedFields: ['description.name'],
			initialSortBy: 'description.name'
		});
		this.dataSrv.init();
		this.viewSrv.setup(this.entityMetadata);
	}

}
