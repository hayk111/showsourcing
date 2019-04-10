import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'request-page-app',
	templateUrl: './request-page.component.html',
	styleUrls: ['./request-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;

	constructor(
		private requestSrv: SupplierRequestService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.requestSrv,
			searchedFields: [],
			entityMetadata: ERM.SUPPLIER_REQUEST,
			initialFilters: [],
			originComponentDestroy: this._destroy$
		});
	}

}
