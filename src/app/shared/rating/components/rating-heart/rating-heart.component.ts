import {
	Component,
	EventEmitter,
	Input,
	Output,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	selector: 'rating-heart-app',
	templateUrl: './rating-heart.component.html',
	styleUrls: ['./rating-heart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(click)': 'onClick($event)'
	}
})
export class RatingHeartComponent {
	// whether it can be voted or not.
	@Input() static = false;
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	@Input() favorite = false;

	onClick() {
		if (this.static)
			return;
		if (this.favorite)
			this.unfavorited.emit();
		else
			this.favorited.emit();
	}

}
