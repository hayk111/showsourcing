import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// it prevents default behavior from up & down & left & right arrows
@Directive({
	selector: '[restrictSpecial]'
})
export class RestrictSpecialInputDirective {

	@Input() restrictArrows: boolean;
	@Input() restrictUpDownArrows: boolean;

	constructor(private elementRef: ElementRef) {
	}

	@HostListener('keydown', ['$event']) onKeyDown(event) {
		const keyboardEvent = <KeyboardEvent>event;

		if (this.restrictArrows && (keyboardEvent.key === 'ArrowUp' ||
			keyboardEvent.key === 'ArrowLeft' || keyboardEvent.key === 'ArrowRight' ||
			keyboardEvent.key === 'ArrowDown')) {
			keyboardEvent.preventDefault();
		} else if (this.restrictUpDownArrows && (keyboardEvent.key === 'ArrowUp' ||
			keyboardEvent.key === 'ArrowDown')) {
			keyboardEvent.preventDefault();
		} else {
			return;
		}
	}
}
