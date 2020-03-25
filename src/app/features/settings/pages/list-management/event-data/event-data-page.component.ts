import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService, SelectionService } from '~core/list-page';
import { AutoUnsub } from '~utils';
import { FilterService } from '~shared/filters/services/filter.service';
import { ListHelperService, ListPageViewService } from '~core/list-page2';
import { Event } from '~core/erm3/models';
import { Observable } from 'rxjs';
import { TeamService, CompanyService } from '~core/auth';
import { Typename } from '~core/erm3/typename.type';

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
	typename: Typename = 'Event';

	items$: Observable<Event[]>;

	constructor(
		// public listSrv: ListPageService<Event, EventService>,
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<Event>,
		public filterSrv: FilterService,
		public listFuseHelper: ListHelperService
	) {
		super();
	}

	ngOnInit() {
	}

	mergeSelected() {
		const events = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.viewSrv.typename,
			entities: events
		});
	}

	showItemsPerPage(count: number) {
	}
}
