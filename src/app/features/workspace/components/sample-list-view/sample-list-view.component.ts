import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sample-list-view-app',
	templateUrl: './sample-list-view.component.html',
	styleUrls: ['./sample-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
