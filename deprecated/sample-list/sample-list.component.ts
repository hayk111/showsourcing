import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { FormControl } from '@angular/forms';
import { FilterList, FilterType } from '~shared/filters';

@Component({
	selector: 'sample-list-app',
	templateUrl: './sample-list.component.html',
	styleUrls: ['./sample-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListComponent extends TrackingComponent implements OnInit {
	sampleCtrl = new FormControl();
	filterTypeEnum = FilterType;
	@Input() samples: Sample[];
	@Input() selection: Map<string, boolean>;
	@Input() filterList: FilterList;
	@Input() hasFilters = true;
	@Output() toggleMySamples = new EventEmitter<boolean>();
	@Output() bottomReached = new EventEmitter<null>();
	@Output() openCreationSampleDlg = new EventEmitter<string>();
	@Output() previewClicked = new EventEmitter<Sample>();
	@Output() taskSelect = new EventEmitter<Sample>();
	@Output() taskUnselect = new EventEmitter<Sample>();
	@Output() updateSample = new EventEmitter<Sample>();

	constructor() {
		super();
	}

	ngOnInit() {
	}
}
