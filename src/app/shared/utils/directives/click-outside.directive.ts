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
		// hint: CDK Element is located at the app-root level
		// if the CDK Element exists check that the click is not inside on both: elementRef and CDK Element
		// OR if the CDK Element is not present, check that the target click is outside the elementRef
		if ((cdk && (!clickedInside && !cdk.contains(targetElement)) || (!cdk && !clickedInside))) {
			this.clickOutside.emit(event);
		}
	}
}
