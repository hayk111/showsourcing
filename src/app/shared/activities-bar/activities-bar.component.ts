import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, AfterContentChecked } from '@angular/core';

@Component({
	selector: 'activities-bar-app',
	templateUrl: './activities-bar.component.html',
	styleUrls: ['./activities-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitiesBarComponent implements OnInit, AfterContentChecked {

	@Input() favourite = false;
	@Input() hasSamples = false;
	@Input() hasTasks = false;
	@Input() hasTasksOverdue = false;
	@Input() hasComments = false;
	@Input() hasOpenRequests = false;
	@Input() votes: any[];

	constructor() { }

	ngOnInit() {

	}

	ngAfterContentChecked() {
	}

	getAvgVotes(votes: any[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(v => v.value);
		const sum = votesVals.reduce((a, b) => a + b, 0);
		return Math.round( sum / votes.length * 10 ) / 10;
	}
}
