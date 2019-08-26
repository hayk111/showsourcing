import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'rating-stars-action-app',
	templateUrl: './rating-stars-action.component.html',
	styleUrls: ['./rating-stars-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsActionComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
