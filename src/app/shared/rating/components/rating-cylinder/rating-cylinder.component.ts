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
	/** color of the like as represented by one of out css4 vars */
	@Input() likeColor = 'success';
	/** width of the cylinder */
	@Input() width = '270';
	/** height of the cylinder */
	@HostBinding('style.height') @Input()
	set height(value) {
		this._height = value + 'px';
	}

	get styleDislike() {
		return {
			background: `var(--color-${this.dislikeColor})`,
			height: this._height,
			width: this.width + 'px'
		};
	}

	get styleLike() {
		return {
			background: `var(--color-${this.likeColor})`
		};
	}

	private _height = '12px';

	constructor() { }

	ngOnInit() {
	}

}
