import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'activities-bar-app',
	templateUrl: './activities-bar.component.html',
	styleUrls: ['./activities-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesBarComponent implements OnInit {

	@Input() favourite = false;
	@Input() hasSamples = false;
	@Input() hasTasks = false;
	@Input() hasComments = false;
	@Input() openRequestsCount = 0;
	@Input() votes: any[];

	constructor() { }

	ngOnInit() {

	}

	getAvgVotes(votes: any[]): number {
		const votesVals = votes.map(v => v.value);
		const sum = votesVals.reduce((a, b) => a + b, 0);
		return Math.round( sum / votes.length * 10 ) / 10;
	}
}
