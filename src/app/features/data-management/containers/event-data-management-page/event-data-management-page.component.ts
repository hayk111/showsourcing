import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventManagementService } from '~features/data-management/services/event-management.service';
import { ERM, Event } from '~models';
import { DialogService } from '~shared/dialog';
import { CreationDialogComponent, MergeDialogComponent } from '~shared/generic-dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FilterService } from '~shared/filters';
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
export class EventDataManagementPageComponent extends ListPageComponent<Event, EventManagementService> {

	constructor(
		protected router: Router,
		protected featureSrv: EventManagementService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.EVENT);
	}

	mergeSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		this.dlgSrv.open(MergeDialogComponent, { type: ERM.EVENT, entities: items });
		// send the items to mergeItems}
	}
}
