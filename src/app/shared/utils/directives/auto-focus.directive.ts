import { AfterContentInit, Directive, ElementRef, Input, Optional } from '@angular/core';
import { TabFocusActionDirective } from './tab-focus-action.directive';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

	@Input() canFocus = true;

	// this allows us to check if the element has also a TabFocusActionDirective
	constructor(
		private el: ElementRef<any>,
		@Optional() private tab: TabFocusActionDirective
	) { }

	ngAfterContentInit() {
		if (this.canFocus) {
			// if the element has a directive tabFocusAction, we will focus that instead of the nativeElement
			if (this.tab) {
				this.tab.focus();
			} else {
				const elem = this.el.nativeElement;
				const value = elem.value;
				if (elem.setSelectionRange) {
					elem.setSelectionRange(value.length, value.length);
				}
				elem.focus();
			}
		}
	}
}
