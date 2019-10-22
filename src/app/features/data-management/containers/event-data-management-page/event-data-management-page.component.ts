import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { EventService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Event } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'event-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./event-data-management-page.component.scss', '../data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class EventDataManagementPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.EVENT;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private eventSrv: EventService,
		public listSrv: ListPageService<Event, EventService>,
		public commonModalSrv: CommonModalService,
		private dmSrv: DataManagementService) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.eventSrv,
			searchedFields: ['description.name'],
			selectParams: { sortBy: 'description.name', descending: false, query: 'deleted == false' },
			entityMetadata: ERM.EVENT,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const events = this.listSrv.getSelectedValues();
		this.dmSrv.merge(events, this.listSrv.entityMetadata);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
