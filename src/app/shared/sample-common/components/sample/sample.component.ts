import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '~models';

@Component({
	selector: 'sample-app',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements OnInit {

	@Input() sample: Sample;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	constructor() { }

	ngOnInit() {
	}

}
