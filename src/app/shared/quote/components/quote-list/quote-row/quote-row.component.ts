import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest } from '~models';

@Component({
	selector: 'quote-app',
	templateUrl: './quote.component.html',
	styleUrls: ['./quote.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent implements OnInit {

	@Input() externalReq: ExternalRequest;
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<ExternalRequest>();
	@Output() previewClicked = new EventEmitter<ExternalRequest>();

	constructor() { }

	ngOnInit() {
	}

	getStatus() {
		let status = 'pending';
		switch (this.externalReq.status) {
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
