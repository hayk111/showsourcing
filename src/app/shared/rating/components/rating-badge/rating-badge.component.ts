import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Vote } from '~core/erm3/models';

@Component({
	selector: 'rating-badge-app',
	templateUrl: './rating-badge.component.html',
	styleUrls: ['./rating-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingBadgeComponent {

	private _vote: Vote | number;
	@Input() set vote(vote: Vote | number) {
		this._vote = vote;

		if (vote) {
			const rating = (vote as Vote).rating || (vote as number); // vote can be passed as an Vote object or just a number
			this.score =  Math.round(rating) / 20;
		} else if (vote === null) {
			this.score = 0;
		}
	}
	get vote() {
		return this._vote;
	}
	@Input() activeColor = 'accent';
	/** whether we display the number on the side or not */
	@Input() hasNumber = false;

	score: number = null;

	constructor() { }

	setWidth() {
		return (this.score * 20 || 0) + '%';
	}

}
