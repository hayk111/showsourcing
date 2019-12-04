import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { EventService, TeamService, CompanyService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { SelectionService } from '~core/list-page';
import { ListPageService } from '~core/list-page';
import { ERM, Event } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'event-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: ['./event-data-page.component.scss', '../shared/list-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		SelectionService
	],
	host: {
		class: 'table-page'
	},
})
export class EventDataPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.EVENT;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private eventSrv: EventService,
		public listSrv: ListPageService<Event, EventService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService) {
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
		this.dialogCommonSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: events
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
