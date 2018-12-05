import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ExternalRequest, Quote } from '~models';
import { RequestStatus } from '~utils/constants/request-status.enum';

@Component({
	selector: 'list-product-images-app',
	templateUrl: './list-product-images.component.html',
	styleUrls: ['./list-product-images.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductImagesComponent implements OnInit {
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
