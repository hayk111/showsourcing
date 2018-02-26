import { Component, Input, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { VoteByType } from '~store/selectors/target/target.selector';

@Component({
	selector: 'chart-app',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
	@Input() votes: VoteByType;
	@Input() colorScheme;
	view: any[] = [150, 150];

	constructor() {}

	ngOnInit() {}

	get positivePercentage() {
		return this.votes.positive.length * 100 / this.votes.total;
	}

	get scheme() {
		return { domain: [this.colorScheme.positive, this.colorScheme.neutral, this.colorScheme.negative] };
	}

	get result() {
		return [
			{
				name: 'Like',
				value: this.votes.positive.length,
			},
			{
				name: 'Neutral',
				value: this.votes.neutral.length,
			},
			{
				name: 'Dislike',
				value: this.votes.negative.length,
			},
		];
	}
}
