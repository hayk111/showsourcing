import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { Store } from '@ngrx/store';
import { selectVotesArrayForSelection, selectVotesForSelection } from '../../../../store/selectors/selection/selection.selector';
import { Vote } from '../../../../store/model/entities/vote.model';
import { entityStateToArray } from '../../../../store/utils/entities.utils';

@Component({
	selector: 'likes-chart-app',
	templateUrl: './likes-chart.component.html',
	styleUrls: ['./likes-chart.component.scss'],
})
export class LikesChartComponent implements OnInit {
	view: any[] = [250, 250];
	votes = [];
	positiveVotes = [];
	negativeVotes = [];
	neutralVotes = [];
	detailsShown = false;
	pending = true;

	result = [
		{
			'name': 'like',
			'value': 0
		},
		{
			'name': 'neutral',
			'value': 0
		},
		{
			'name': 'Despise',
			'value': 0
		}
	];

	colorScheme = {
		domain: [
			// success
			'#71e591',
			'#EBEBEB',
			// warn
			'#f94259']
	};

	constructor(private store: Store<any>) {

	}

	ngOnInit() {
		// votes are value 100 for positive 0 for negative and no value for neutral
		this.store.select(selectVotesForSelection).subscribe( (voteState: any) => {
			this.pending = voteState.pending;
			const votes = entityStateToArray(voteState);
			this.votes = [];
			this.reset();
			votes.forEach((v: Vote) => {
				this.votes.push(v);
				switch (v.value) {
					case 100 :
						this.result[0].value++;
						this.positiveVotes.push(v);
						break;
					case 0:
						this.result[2].value++;
						this.negativeVotes.push(v);
						break;
					default:
						this.result[1].value++;
						this.neutralVotes.push(v);
						break;
				}
			});
		});
	}

	reset() {
		this.result.forEach(r => r.value = 0);
		this.positiveVotes = [];
		this.negativeVotes = [];
		this.neutralVotes = [];
	}

	get positivePercentage() {
		return this.result[0].value / this.votes.length;
	}

	showDetails() {
		this.detailsShown = true;
	}

}
