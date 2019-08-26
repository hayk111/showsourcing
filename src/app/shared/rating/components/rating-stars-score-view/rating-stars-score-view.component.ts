import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'rating-stars-score-view-app',
	templateUrl: './rating-stars-score-view.component.html',
	styleUrls: ['./rating-stars-score-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsScoreViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
