import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SupplierRequestService, UserService } from '~core/erm';
import { SelectParams } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { ERM, SupplierRequest } from '~core/erm';
import { FilterType } from '~shared/filters';
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
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		private userSrv: UserService
	) {
		super();
	}


	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'sentDate' });
		this.listSrv.setup({
			entityMetadata: ERM.SUPPLIER_REQUEST,
			entitySrv: this.suppRequestSrv,
			searchedFields: ['sender.name', 'status', 'title', 'sender.company'],
			initialFilters: [{ type: FilterType.CUSTOM, value: `recipientUser.id == "${this.userSrv.userIdSync}"` }],
			selectParams,
			originComponentDestroy$: this._destroy$
		});
	}

}
