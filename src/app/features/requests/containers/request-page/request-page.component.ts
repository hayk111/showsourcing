import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ERM, Request } from '~core/models';
import { RequestService } from '~core/entity-services';
import { ListPageService, ListPageKey } from '~core/list-page';
import { CommonModalService } from '~common/modals';
import { TrackingComponent } from '~utils';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Component({
	selector: 'request-page-app',
	templateUrl: './request-page.component.html',
	styleUrls: ['./request-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPageComponent extends TrackingComponent implements OnInit {

	erm = ERM;

	constructor(
		private requestSrv: RequestService,
		public listSrv: ListPageService<Request, RequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.requestSrv,
			searchedFields: [],
			entityMetadata: ERM.REQUEST,
			initialFilters: [],
			client: Client.GLOBAL_REQUEST
		});
	}

}
