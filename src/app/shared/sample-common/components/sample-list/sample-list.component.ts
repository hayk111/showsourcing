import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '~models';

@Component({
	selector: 'sample-list-app',
	templateUrl: './sample-list.component.html',
	styleUrls: ['./sample-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListComponent implements OnInit {

	@Input() samples: Sample[];
	@Input() selection: Map<string, any>;
	@Input() hasProduct = false;
	@Input() hasSupplier = false;
	@Output() bottomReached = new EventEmitter<null>();
	@Output() createSample = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() taskSelect = new EventEmitter<Sample>();
	@Output() taskUnselect = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	constructor() { }

	ngOnInit() {
	}

}
