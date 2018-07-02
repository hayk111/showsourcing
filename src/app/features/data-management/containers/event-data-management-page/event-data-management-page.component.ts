import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { EventManagementService } from '~features/data-management/services/event-management.service';
import { ERM, Event } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_EVENT },
		SelectionService]
})
export class EventDataManagementPageComponent extends AbstractDataManagementComponent<Event, EventManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: EventManagementService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, dlgSrv, ERM.EVENT);
	}
}
