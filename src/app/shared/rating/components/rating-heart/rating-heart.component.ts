import {
	Component,
	EventEmitter,
	Input,
	Output,
	ChangeDetectionStrategy,
	ViewChild,
	Renderer2,
	ElementRef
} from '@angular/core';
import { IconComponent } from '~shared/icons';

@Component({
	selector: 'rating-heart-app',
	templateUrl: './rating-heart.component.html',
	styleUrls: ['./rating-heart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(mousedown)': 'onClick($event)'
	}
})
export class RatingHeartComponent {
	// whether it can be voted or not.
	@Input() static = false;
	@Input() size = '14';
	@Output() favorited = new EventEmitter<null>();
	@Output() unfavorited = new EventEmitter<null>();
	@Input() favorite = false;
	@ViewChild(IconComponent, { read: ElementRef }) icon;

	constructor(private renderer: Renderer2) {

	}

	onClick() {
		if (this.static)
			return;
		if (this.favorite) {
			this.unfavorited.emit();
		} else {
			this.favorited.emit();
		}
		this.addAnimationClass();
	}

	addAnimationClass() {
		// removing the animation class to retrigger animation by readding the class
		this.renderer.removeClass(this.icon.nativeElement, 'jello-horizontal');
		// lil trick to retrigger animation
		this.renderer.setAttribute(this.icon.nativeElement, 'offsetWidth', this.icon.nativeElement.offsetWidth);
		this.renderer.addClass(this.icon.nativeElement, 'jello-horizontal');
	}

}
