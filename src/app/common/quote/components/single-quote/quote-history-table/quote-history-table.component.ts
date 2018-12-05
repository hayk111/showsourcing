import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { RequestStatus } from '~utils/constants/request-status.enum';

@Component({
	selector: 'quote-history-table-app',
	templateUrl: './quote-history-table.component.html',
	styleUrls: ['./quote-history-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteHistoryTableComponent implements OnInit {
	RequestStatus = RequestStatus;

	@Input() quote: Quote;
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Quote>();
	@Output() previewClicked = new EventEmitter<Quote>();

	constructor() { }

	ngOnInit() {
	}

	getStatus() {
		return this.quote.status || RequestStatus.PENDING;
	}

}
