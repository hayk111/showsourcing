import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'rating-heart-app',
	templateUrl: './rating-heart.component.html',
	styleUrls: ['./rating-heart.component.scss'],
})
export class RatingHeartComponent implements OnInit {
	@Output() rated = new EventEmitter<number>();
	favorite = false;

	constructor() {}

	ngOnInit() {}

	onClick() {
		if (this.favorite) this.rated.emit(5);
		else this.rated.emit(0);
	}

	// an entity is favorited when an entity is 5 stars
	@Input()
	set rating(v) {
		if (v === 5) {
			this.favorite = true;
		} else {
			this.favorite = false;
		}
	}
}
