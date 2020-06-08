import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { RatingService } from '~shared/rating/services/rating.service';
import { Vote } from '~core/erm3/models';

@Component({
	selector: 'rating-stars-score-view-app',
	templateUrl: './rating-stars-score-view.component.html',
	styleUrls: ['./rating-stars-score-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsScoreViewComponent {

	private _teamVotes: Vote[];
	@Input() set teamVotes(votes: Vote[]) {
		this._teamVotes = votes;
		this.totalVotes = votes ? votes.length : 0;
		this.setValues();
	}
	get teamVotes() {
		return this._teamVotes;
	}

	private _userVote: Vote;
	@Input() set userVote(vote: Vote) {
		this._userVote = vote;
		this.setValues(false);
	}
	get userVote() {
		return this._userVote;
	}

	/** map that contains the key and values of the stars -> [ rate-star, number-vote ] */
	votesMap: Map<number, number>;
	totalVotes = 0;
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
	private setValues(teamVotes = true) {
		// creates a new map [ [1, 0] ... [5, 0] ]
		this.votesMap = new Map(Array.from({ length: 5 }, (x, i) => ([i + 1, 0])));

		if (teamVotes) {
			this.totalVotes = this._teamVotes ? this._teamVotes.length : 0;
			this.score = this.getAvgScore(this._teamVotes);

			if (this._teamVotes && this._teamVotes.length) {
				this._teamVotes.forEach(vote => {
					this.addVoteToVotesMap(vote);
				});
			}
		} else {
			this.totalVotes = this.totalVotes || 1;
			this.score = this._userVote ? this._userVote.rating : 0;
			this.addVoteToVotesMap(this._userVote);
		}

		this.cdr.markForCheck();
	}

	private getAvgScore(votes: Vote[]) {
		if (!votes || !votes.length) {
			return 0;
		}

		const sum = votes.reduce((acc, vote) => acc += vote.rating, 0);
		return sum / votes.length;
	}

	private addVoteToVotesMap(vote: Vote) {
		if (vote) {
			switch (vote.rating || vote) {
				case 1:
					this.votesMap.set(1, this.votesMap.get(1) + 1);
					break;
				case 2:
					this.votesMap.set(2, this.votesMap.get(2) + 1);
					break;
				case 3:
					this.votesMap.set(3, this.votesMap.get(3) + 1);
					break;
				case 4:
					this.votesMap.set(4, this.votesMap.get(4) + 1);
					break;
				case 5:
					this.votesMap.set(5, this.votesMap.get(5) + 1);
					break;
			}
		}
	}

}
