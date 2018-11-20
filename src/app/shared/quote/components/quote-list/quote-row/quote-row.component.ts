import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { RequestStatus } from '~utils/constants/request-status.enum';

@Component({
	selector: 'quote-row-app',
	templateUrl: './quote-row.component.html',
	styleUrls: ['./quote-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent implements OnInit {
	RequestStatus = RequestStatus;

	@Input() quote: Quote;
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Quote>();
	@Output() previewClicked = new EventEmitter<Quote>();

	constructor() { }

	ngOnInit() {
	}

	getStatus() {
		let status = RequestStatus.PENDING;
		switch (this.quote.status) {
			case RequestStatus.REPLIED:
				status = RequestStatus.REPLIED;
				break;
			case RequestStatus.VALIDATED:
				status = RequestStatus.VALIDATED;
				break;
			case RequestStatus.REJECTED:
				status = RequestStatus.REJECTED;
				break;
		}
		return status;
	}

}
