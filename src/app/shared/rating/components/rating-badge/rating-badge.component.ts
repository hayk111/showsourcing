import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductVote } from '~core/models';
import { RatingService } from '~shared/rating/services/rating.service';

@Component({
	selector: 'rating-badge-app',
	templateUrl: './rating-badge.component.html',
	styleUrls: ['./rating-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingBadgeComponent {

	private _votes: ProductVote[];
	@Input() set votes(votes: ProductVote[]) {
		this._votes = votes;
		this.score = this.ratingSrv.computeScoreVotes(votes);
	}
	get votes() {
		return this._votes;
	}
	@Input() activeColor = 'accent';
	/** whether we display the number on the side or not */
	@Input() hasNumber = false;

	score: number = null;

	constructor(public ratingSrv: RatingService) { }

	setWidth() {
		return (this.score * 20 || 0) + '%';
	}

}
