import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { EventService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Event } from '~models';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class EventDataManagementPageComponent implements OnInit {

	constructor(
		private eventSrv: EventService,
		public listSrv: ListPageService<Event, EventService>,
		public commonDlgSrv: CommonDialogService,
		private dmSrv: DataManagementService
	) {
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.EVENT,
			entitySrv: this.eventSrv,
			searchedFields: ['description.name'],
			initialSortBy: 'description.name',
			entityMetadata: ERM.EVENT
		});
	}

	mergeSelected() {
		const ids = this.listSrv.selectionSrv.getSelectionIds();
		this.dmSrv.merge(ids, this.listSrv.entityMetadata);
	}

}
