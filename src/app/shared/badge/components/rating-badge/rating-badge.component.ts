import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductVote } from '~core/models';
import { ThumbService } from '~shared/rating/services/thumbs.service';

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
		this.score = this.thumbSrv.computeScoreVotes(votes);
	}
	get votes() {
		return this._votes;
	}
	/** whether it has a background color or not*/
	@Input() background = true;

	score: number = null;

	constructor(public thumbSrv: ThumbService) { }

	getClasses() {
		let classes = this.score >= 3.5 ? 'color-accent-dark' : 'color-txt-third';
		if (this.background) {
			classes += this.score >= 3.5 ? ' bg-accent-light' : ' bg-secondary-light';
		}
		return classes;
	}

}
