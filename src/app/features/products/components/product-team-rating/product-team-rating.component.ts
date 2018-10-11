import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
		// we do this since the update on the score takes 50ms (more or less on the first vote) to process
		// when clicking the first time the rating cylinder and the score would get updated after that delay
		// provoking a visual glitch, this way we ensure the visual glitch is gone.
		if (this.votes && this.votes.length === 1)
			this.score = this.votes[0].value;
	}

	@Output() requestTeamVotes = new EventEmitter<null>();
	@Output() liked = new EventEmitter<null>();
	@Output() disliked = new EventEmitter<null>();
	@Output() openVoteDetails = new EventEmitter<null>();

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
			this.name = this.score >= 50 ? 'thumbs-up-background' : 'thumbs-down-background';
		}
		return { color: `var(--color-${state})` };
	}
}
