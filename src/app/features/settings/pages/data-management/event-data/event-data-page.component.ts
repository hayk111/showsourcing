import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { EventService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Event } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'event-data-page-app',
	templateUrl: '../shared/data-management-template.html',
	styleUrls: ['./event-data-page.component.scss', '../shared/data-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class EventDataPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.EVENT;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private eventSrv: EventService,
		public listSrv: ListPageService<Event, EventService>,
		public commonModalSrv: CommonModalService) {
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
		this.commonModalSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: events
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
