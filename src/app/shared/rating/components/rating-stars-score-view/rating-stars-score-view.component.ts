import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductVote } from '~core/models';
import { ThumbService } from '~shared/rating/services/thumbs.service';

@Component({
	selector: 'rating-stars-score-view-app',
	templateUrl: './rating-stars-score-view.component.html',
	styleUrls: ['./rating-stars-score-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsScoreViewComponent {

	private _votes: ProductVote[];
	@Input() set votes(votes: ProductVote[]) {
		this._votes = votes;
		this.setValues();
	}
	get votes() {
		return this._votes;
	}

	votesMap: Map<number, number>;
	totalVotes = 1;
	score = 0;

	constructor(
		private cdr: ChangeDetectorRef,
		private thumbSrv: ThumbService
	) { }

	/**
	 * sets votesmap, total values and score
	 */
	private setValues() {
		this.totalVotes = 0;
		this.votesMap = new Map([[5, 0], [4, 0], [3, 0], [2, 0], [1, 0]]);
		// we increate the total votes inside the switchase instead of doing totalVotes = votes.length
		// because sometimes we have votes that have score 0 and we don't want those to be in the total
		(this.votes || []).forEach(vote => {
			switch (vote.value) {
				case 20:
					this.votesMap.set(1, this.votesMap.get(1) + 1);
					this.totalVotes += 1;
					break;
				case 40:
					this.votesMap.set(2, this.votesMap.get(2) + 1);
					this.totalVotes += 1;
					break;
				case 60:
					this.votesMap.set(3, this.votesMap.get(3) + 1);
					this.totalVotes += 1;
					break;
				case 80:
					this.votesMap.set(4, this.votesMap.get(4) + 1);
					this.totalVotes += 1;
					break;
				case 100:
					this.votesMap.set(5, this.votesMap.get(5) + 1);
					this.totalVotes += 1;
					break;
			}
		});
		this.score = this.thumbSrv.computeScoreVotes(this.votes);
		this.cdr.markForCheck();
	}

}
