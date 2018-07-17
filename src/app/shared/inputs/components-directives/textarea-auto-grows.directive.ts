import { Directive, HostBinding, ElementRef } from '@angular/core';


@Directive({
	selector: '[autoGrows]',
})
export class TextareaAutoGrowsDirective {

	constructor(private el: ElementRef) { }

	@HostBinding('keyup')
	onKeyUp() {
		// this
	}

}
