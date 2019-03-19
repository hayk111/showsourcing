import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { GlobalRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, GlobalRequest } from '~core/models';
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
		private globalRequestSrv: GlobalRequestService,
		public listSrv: ListPageService<GlobalRequest, GlobalRequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.globalRequestSrv,
			searchedFields: [],
			entityMetadata: ERM.GLOBAL_REQUEST,
			initialFilters: [],
		});
	}

	createRequest() {
		const manew = new GlobalRequest({
			message: 'miau', title: 'supreme title', senderTeamId: 'really long id', status: 'pending',
			creationDate: new Date().toString(), lastUpdatedDate: new Date().toString()
		});
		this.listSrv.update(manew);
	}

}
