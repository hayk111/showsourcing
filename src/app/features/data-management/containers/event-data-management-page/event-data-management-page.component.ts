import { ChangeDetectionStrategy, Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { EventManagementService } from '~features/data-management/services/event-management.service';
import { ERM, Event } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		SelectionService]
})
export class EventDataManagementPageComponent extends AbstractDataManagementComponent<Event, EventManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: EventManagementService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.EVENT);
	}
}
