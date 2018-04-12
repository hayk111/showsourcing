import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	selector: 'rating-heart-app',
	templateUrl: './rating-heart.component.html',
	styleUrls: ['./rating-heart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingHeartComponent {
	// whether it can be voted or not.
	@Input() static = false;
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	favorite = false;

	onClick() {
		if (this.static) return;
		if (this.favorite)
			this.unfavorited.emit();
		else
			this.favorited.emit();
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
