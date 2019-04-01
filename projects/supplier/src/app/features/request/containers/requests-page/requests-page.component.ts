import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierRequestService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SupplierRequest } from '~models';

@Component({
	selector: 'requests-page-sup',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent implements OnInit {

	requests$: Observable<SupplierRequest[]>;
	erm = ERM;

	constructor(
		private suppRequestSrv: SupplierRequestService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>
	) { }


	ngOnInit() {
		this.listSrv.setup({
			entityMetadata: ERM.SUPPLIER_REQUEST,
			entitySrv: this.suppRequestSrv,
			key: ListPageKey.SUPPLIER_REQUEST,
			searchedFields: ['sender.name', 'status', 'title', 'sender.company'],
			selectParams: { sortBy: 'creationDate' }
		});
	}

}
