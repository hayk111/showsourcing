import { AfterContentInit, Directive, ElementRef, Input, Optional } from '@angular/core';
import { TabFocusDirective } from './tab-focus.directive';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

	@Input() canFocus = true;

	constructor(private el: ElementRef<any>, @Optional() private tab: TabFocusDirective) { }

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
