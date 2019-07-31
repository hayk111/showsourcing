import { AfterContentInit, Directive, ElementRef, Input, Optional } from '@angular/core';
import { TabFocusActionDirective } from './tab-focus-action.directive';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

	@Input() canFocus = true;

	constructor(private el: ElementRef<any>, @Optional() private tab: TabFocusActionDirective) { }

	ngAfterContentInit() {
		if (this.canFocus) {
			setTimeout(() => {
				// its a property form the directive, not the native element
				if (this.tab) {
					this.tab.focus();
				} else {
					this.el.nativeElement.focus();
				}
			}, 0);
		}
	}
}
