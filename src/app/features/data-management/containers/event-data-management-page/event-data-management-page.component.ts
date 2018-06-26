import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventManagementService } from '~features/data-management/services/event-management.service';
import { ERM, Event } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'app-event-data-management-page',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectionService]
})
export class EventDataManagementPageComponent extends ListPageComponent<Event, EventManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: EventManagementService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.EVENT, DialogName.NEW_EVENT);
	}

}
