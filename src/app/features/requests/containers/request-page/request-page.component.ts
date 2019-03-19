import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { RequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, Request } from '~core/models';
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
		});
	}

	createRequest() {
		const manew = new Request({
			message: 'miau', title: 'supreme title', status: 'pending', shareInformation: true
		});
		this.listSrv.update(manew);
	}

}
