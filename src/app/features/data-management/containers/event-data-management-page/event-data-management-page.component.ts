import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { EventManagementService } from '~features/data-management/services/event-management.service';
import { ERM, Event, ERM_TOKEN } from '~models';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		getProviders(ProviderKey.EVENT, ERM.EVENT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.EVENT }
	]
})
export class EventDataManagementPageComponent extends AbstractDataManagementComponent<Event, EventManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: EventManagementService,
		protected viewSrv: ListPageViewService<Event>,
		public dataSrv: ListPageDataService<Event, EventManagementService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super(router, featureSrv, viewSrv, dataSrv, selectionSrv, commonDlgSrv, ERM.EVENT);
	}

	search(str: string) {
		this.dataSrv.currentSearch = `description.name CONTAINS[c] "${str}"`;
		this.dataSrv.onPredicateChange();
	}

}
