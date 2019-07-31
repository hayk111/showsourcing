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
			setTimeout(() => {
				// if the element has a directive tabFocusAction, we will focus that instead of the nativeElement
				if (this.tab) {
					this.tab.focus();
				} else {
					this.el.nativeElement.focus();
				}
			}, 0);
		}
	}
}
