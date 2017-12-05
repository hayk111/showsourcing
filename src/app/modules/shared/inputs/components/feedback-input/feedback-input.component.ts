import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductVote } from '../../../../store/model/product-vote.model';

@Component({
	selector: 'feedback-input-app',
	templateUrl: './feedback-input.component.html',
	styleUrls: ['./feedback-input.component.scss']
})
export class FeedbackInputComponent implements OnInit {
	@Input() votes: Array<ProductVote>;
	@Output() vote = new EventEmitter<number>();
	@Output() request = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

	get percentage() {
		if (!this.votes || this.votes.length === 0)
			return 0;
		const totalVotes = this.votes.length;
		let totalScore = 0;
		this.votes.forEach(v => {
			if (v.value > 0)
				totalScore++;
			else
				totalScore--;
		});
		return totalScore / totalVotes * 100;
	}

}
