import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote, AppImage } from '~models';
import { RequestStatus } from '~utils/constants/request-status.enum';

export class QuoteSupplierInfoHeaderType {
	type?: ('files' | 'text' | 'date') = 'text';
	title = '';
	value: any;
}

@Component({
	selector: 'supplier-info-header-app',
	templateUrl: './supplier-info-header.component.html',
	styleUrls: ['./supplier-info-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfoHeaderComponent implements OnInit {
	RequestStatus = RequestStatus;

	@Input() quote: Quote;

	fields: QuoteSupplierInfoHeaderType[] = [];

	constructor() {
		this.fields = [{
			title: 'Requested By: ',
			value: 'Colette Bourdoux'
		}, {
			type: 'date',
			title: 'Received On: ',
			value: new Date()
		}, {
			title: 'From: ',
			value: 'Overland ceramic'
		}, {
			type: 'files',
			title: 'Files: ',
			value: [{
				fileName: 'ARJ-123.pdf'
			}, {
				fileName: 'ARJ-123-MOQ.pdf'
			}, {
				fileName: 'ARJ-123_Samples.pdf'
			}]
		}];
	}

	ngOnInit() {
	}

	getStatus() {
		return this.quote.status || RequestStatus.PENDING;
	}

}

