import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'sample-card-app',
	templateUrl: './sample-card.component.html',
	styleUrls: ['./sample-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleCardComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
