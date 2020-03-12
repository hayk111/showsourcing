import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	CompanyService,
	ERM,
	Event,
	EventService,
	SelectParamsConfig,
	TeamService
} from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { AutoUnsub } from '~utils';
import { FilterService } from '~shared/filters/services/filter.service';

@Component({
	selector: 'event-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: [
		'./event-data-page.component.scss',
		'../shared/list-management-styles.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService, SelectionService, ListPageViewService],
	host: {
		class: 'table-page'
	}
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
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Event>,
		public filterSrv: FilterService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.eventSrv,
			searchedFields: ['description.name'],
			selectParams: {
				sortBy: 'description.name',
				descending: false,
				query: 'deleted == false'
			},
			entityMetadata: ERM.EVENT,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const events = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.entityMetadata,
			entities: events
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
