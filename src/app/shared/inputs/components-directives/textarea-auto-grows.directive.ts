import { Directive, HostBinding, ElementRef } from '@angular/core';




@Directive({
	selector: '[restrictInput]',
})
export class TextareaAutoGrowsDirective {

	constructor(private el: ElementRef) { }

	@HostBinding('keyup')
	onKeyUp() {
		// this
	}

}
