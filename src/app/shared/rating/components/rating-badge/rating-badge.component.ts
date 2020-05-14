import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'rating-badge-app',
	templateUrl: './rating-badge.component.html',
	styleUrls: ['./rating-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingBadgeComponent {

	private _score: number | null;
	@Input() set score(value: number | null) {
		this._score = value;
	}
	get score() {
		return this._score;
	}
	@Input() activeColor = 'accent';
	/** whether we display the number on the side or not */
	@Input() hasNumber = false;

	constructor() { }

	setWidth() {
		return (this._score * 20 || 0) + '%';
	}

}
