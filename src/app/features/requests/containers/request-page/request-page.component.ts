import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { TeamRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, TeamRequest } from '~core/models';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'request-page-app',
	templateUrl: './request-page.component.html',
	styleUrls: ['./request-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPageComponent extends TrackingComponent implements OnInit {

	erm = ERM;

	constructor(
		private teamRequestSrv: TeamRequestService,
		public listSrv: ListPageService<TeamRequest, TeamRequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.teamRequestSrv,
			searchedFields: [],
			entityMetadata: ERM.TEAM_REQUEST,
			initialFilters: [],
		});
	}

	createRequest() {
		const manew = new TeamRequest({
			message: 'miau', title: 'supreme title', senderTeamId: 'really long id', status: 'pending',
			creationDate: new Date().toString(), lastUpdatedDate: new Date().toString()
		});
		this.listSrv.update(manew);
	}

}
