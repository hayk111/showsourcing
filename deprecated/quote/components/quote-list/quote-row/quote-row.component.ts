import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quote, RequestStatus } from '~models';

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
		return this.quote.status || RequestStatus.PENDING;
	}

}
