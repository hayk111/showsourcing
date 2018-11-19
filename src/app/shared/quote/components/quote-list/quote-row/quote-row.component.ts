import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote } from '~models';

@Component({
	selector: 'quote-row-app',
	templateUrl: './quote-row.component.html',
	styleUrls: ['./quote-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent implements OnInit {

	@Input() quote: Quote;
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<ExternalRequest>();
	@Output() previewClicked = new EventEmitter<ExternalRequest>();

	constructor() { }

	ngOnInit() {
	}

	getStatus() {
		let status = 'pending';
		switch (this.quote.status) {
			case 'replied':
				status = 'replied';
				break;
			case 'validated':
				status = 'validated';
				break;
			case 'rejected':
				status = 'rejected';
				break;
		}
		return status;
	}

}
