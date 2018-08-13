import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Product, ProductVote } from '~models';

@Component({
	selector: 'product-team-rating-app',
	templateUrl: './product-team-rating.component.html',
	styleUrls: ['./product-team-rating.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTeamRatingComponent implements OnInit {

	@Input() set product(product: Product) {
		this.score = product.score;
		this.votes = product.votes;
	}

	@Output() requestTeamVotes = new EventEmitter<null>();

	score: number;
	votes: ProductVote[];
	name = 'thumbs-up-white';

	constructor() { }

	ngOnInit() {
	}

	get buttonStyle() {
		let state = 'secondary-dark';
		if (this.votes) {
			state = this.score >= 50 ? 'success' : 'warn';
			this.name = this.score >= 50 ? 'thumbs-up-white' : 'thumbs-down-white';
		}
		return { background: `var(--color-${state})` };
	}
}
