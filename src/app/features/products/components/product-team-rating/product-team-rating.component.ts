import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'product-team-rating-app',
	templateUrl: './product-team-rating.component.html',
	styleUrls: ['./product-team-rating.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTeamRatingComponent implements OnInit {

	@Input() product: Product;
	score: number;
	name = 'thumbs-up-white';
	size = '9';

	constructor() { }

	ngOnInit() {
	}

	get getScore() {
		return 0;
	}

	get successStyle() {
		const state = this.score == null ? 'secondary-dark' : this.score >= 50 ? 'success' : 'warn';
		let style = {};
		if (state) {
			this.size = '18';
			style = {
				background: `var(--color-${state})`,
				'border-radius': '50%',
				'width': '34px',
				'height': '34px',
				'margin-top': '2px',
			};
		} else {
			this.size = '14';
			style = {
				'margin-top': '2px'
			};
		}
		return style;
	}

}
