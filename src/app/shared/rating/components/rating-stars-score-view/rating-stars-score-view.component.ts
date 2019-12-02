import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductVote } from '~core/models';
import { RatingService } from '~shared/rating/services/rating.service';

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

	/** map that contains the key and values of the stars -> [ rate-star, number-votes ] */
	votesMap: Map<number, number>;
	totalVotes = 1;
	score = 0;

	// by default keyvalue pipe orders in ascending
	/** function that orders by descending key */
	compareFn = (a, b) => b.key > a.key ? 1 : -1;

	constructor(
		private cdr: ChangeDetectorRef,
		private ratingSrv: RatingService
	) { }

	/**
	 * sets votesmap, total values and score
	 */
	private setValues() {
		this.totalVotes = this.votes && this.votes.length;
		// creates a new map [ [1, 0] ... [5, 0] ]
		this.votesMap = new Map(Array.from({ length: 5 }, (x, i) => ([i + 1, 0])));
		// we increate the total votes inside the switchase instead of doing totalVotes = votes.length
		// because sometimes we have votes that have score 0 and we don't want those to be in the total
		(this.votes || []).forEach(vote => {
			switch (vote.value) {
				case 20:
					this.votesMap.set(1, this.votesMap.get(1) + 1);
					break;
				case 40:
					this.votesMap.set(2, this.votesMap.get(2) + 1);
					break;
				case 60:
					this.votesMap.set(3, this.votesMap.get(3) + 1);
					break;
				case 80:
					this.votesMap.set(4, this.votesMap.get(4) + 1);
					break;
				case 100:
					this.votesMap.set(5, this.votesMap.get(5) + 1);
					break;
			}
		});
		this.score = this.ratingSrv.computeScoreVotes(this.votes);
		this.cdr.markForCheck();
	}

}
