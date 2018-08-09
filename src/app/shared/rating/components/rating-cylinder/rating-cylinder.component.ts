import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'rating-cylinder-app',
	templateUrl: './rating-cylinder.component.html',
	styleUrls: ['./rating-cylinder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingCylinderComponent implements OnInit {
	/** score in percent of the item */
	@Input() score = 0;
	/** color of the dislike as represented by one of our css4 vars */
	@Input() dislikeColor = 'secondary-dark';

	/** height of the cylinder */
	@HostBinding('style.height') @Input()
	set height(value) {
		this._height = value + 'px';
	}

	get style() {
		return {
			background: `var(--color-${this.dislikeColor})`,
			height: this._height
		};
	}

	private _height = '12px';

	constructor() { }

	ngOnInit() {
	}

}
