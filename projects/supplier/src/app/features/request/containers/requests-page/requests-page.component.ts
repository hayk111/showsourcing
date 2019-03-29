import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SupplierRequestService, UserService } from '~core/entity-services';
import { SupplierRequest, ERM } from '~models';
import { ListPageKey, ListPageService } from '~core/list-page';

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
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		private userSrv: UserService
	) { }


	ngOnInit() {
		this.userSrv.selectUser().subscribe(user =>
			this.listSrv.setup({
				entityMetadata: ERM.SUPPLIER_REQUEST,
				entitySrv: this.suppRequestSrv,
				key: ListPageKey.SUPPLIER_REQUEST,
				searchedFields: ['sender.name', 'status', 'title'],
				selectParams: { query: `recipient.email == "${user.email}"`, sortBy: 'creationDate' }
			})
		);
	}

}
