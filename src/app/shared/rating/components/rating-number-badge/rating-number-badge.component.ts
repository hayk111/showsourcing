import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RatingService, Vote } from '~shared/rating/services/rating.service';

@Component({
	selector: 'rating-number-badge-app',
	templateUrl: './rating-number-badge.component.html',
	styleUrls: ['./rating-number-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingNumberBadgeComponent {

	private _votes: Vote[];
	@Input() set votes(votes: Vote[]) {
		this._votes = votes;
		this.score = this.ratingSrv.computeScoreVotes(votes);
	}
	get votes() {
		return this._votes;
	}
	/** whether it has a background color or not*/
	@Input() background = true;

	score: number = null;

	constructor(public ratingSrv: RatingService) { }

	getClasses() {
		let classes = this.score >= 3.5 ? 'color-accent-dark' : 'color-third';
		if (this.background) {
			classes += this.score >= 3.5 ? ' bg-accent-light' : ' bg-secondary-light';
		}
		return classes;
	}

}
