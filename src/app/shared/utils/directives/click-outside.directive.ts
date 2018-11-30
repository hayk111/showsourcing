import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[clickOutside]'
})
export class ClickOutsideDirective {
	constructor(private _elementRef: ElementRef) {
	}

	@Output()
	public clickOutside = new EventEmitter<MouseEvent>();

	// using mousedown instead so we the event doesn't fire
	// if the element the directive is attached to wasn't visible before the click
	@HostListener('window:mousedown', ['$event', '$event.target'])
	public onClick(event: MouseEvent, targetElement: HTMLElement): void {
		const cdk = document.getElementsByClassName('cdk-overlay-container')[0];
		if (!targetElement) {
			return;
		}

		const clickedInside = this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside && (cdk && !cdk.contains(targetElement))) {
			this.clickOutside.emit(event);
		}
	}
}
