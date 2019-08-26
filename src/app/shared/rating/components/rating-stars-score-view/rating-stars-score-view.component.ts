import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductVote } from '~core/models';

@Component({
	selector: 'rating-stars-score-view-app',
	templateUrl: './rating-stars-score-view.component.html',
	styleUrls: ['./rating-stars-score-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsScoreViewComponent implements OnInit {

	@Input() votes: ProductVote[];

	votesMap: Map<number, number>;
	totalVotes = 0;

	constructor(private cdr: ChangeDetectorRef) {
		this.votesMap = new Map();
		this.votesMap.set(1, 4);
		this.votesMap.set(2, 1);
		this.votesMap.set(3, 8);
		this.votesMap.set(4, 5);
		this.votesMap.set(5, 13);
		this.votesMap.forEach((v, k) => this.totalVotes += v);
	}

	ngOnInit() {
		setTimeout(_ => {
			this.votesMap.set(1, 12);
			this.totalVotes = 0;
			this.votesMap.forEach((v, k) => this.totalVotes += v);
			console.log('we called it ', this.votesMap);
			// this.cdr.markForCheck();
		}, 2000);
	}

}
