import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService, SupplierRequestService, UserService } from '~core/entity-services';
import { Request, SupplierRequest } from '~models';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent implements OnInit {

	requests$: Observable<SupplierRequest[]>;

	constructor(private requestSrv: SupplierRequestService, private userSrv: UserService) { }

	ngOnInit() {
		this.requests$ = this.userSrv.selectUser().pipe(
			switchMap(user => this.requestSrv.queryMany({ query: `recipient.email == "${user.email}"` }))
		);
	}

}
