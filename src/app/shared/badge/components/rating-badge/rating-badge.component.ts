import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
	@Input() activeColor = 'accent';

	score: number = null;

	constructor(public thumbSrv: ThumbService) { }

	setWidth() {
		return (this.score * 20 || 0) + '%';
	}

}
