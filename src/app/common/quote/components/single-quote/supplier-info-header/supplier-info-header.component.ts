import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { RequestStatus } from '~utils/constants/request-status.enum';

@Component({
	selector: 'supplier-info-header-app',
	templateUrl: './supplier-info-header.component.html',
	styleUrls: ['./supplier-info-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfoHeaderComponent implements OnInit {
	RequestStatus = RequestStatus;

	@Input() quote: Quote;
	
	fields = [

	];

	constructor() { }

	ngOnInit() {
	}

	getStatus() {
		return this.quote.status || RequestStatus.PENDING;
	}

}
