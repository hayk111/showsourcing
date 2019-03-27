import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService, SupplierRequestService } from '~core/entity-services';
import { Request, SupplierRequest } from '~models';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent implements OnInit {

	requests$: Observable<SupplierRequest[]>;

	constructor(private requestSrv: SupplierRequestService) { }

	ngOnInit() {
		this.requests$ = this.requestSrv.queryAll();
	}

}
