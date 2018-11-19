import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sample-app',
	templateUrl: './sample.component.html',
	styleUrls: ['./sample.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
