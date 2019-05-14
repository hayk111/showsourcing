import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SupplierRequestService } from '~core/entity-services';
import { SelectParams } from '~core/entity-services/_global/select-params';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SupplierRequest } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-sup',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;

	constructor(
		private suppRequestSrv: SupplierRequestService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>
	) {
		super();
	}


	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'sentDate' });
		this.listSrv.setup({
			entityMetadata: ERM.SUPPLIER_REQUEST,
			entitySrv: this.suppRequestSrv,
			key: ListPageKey.SUPPLIER_REQUEST,
			searchedFields: ['sender.name', 'status', 'title', 'sender.company'],
			selectParams,
			originComponentDestroy$: this._destroy$
		});
	}

}
