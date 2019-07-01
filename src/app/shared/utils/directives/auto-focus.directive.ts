import { Directive, ElementRef, OnInit, AfterContentInit, Input } from '@angular/core';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

	@Input() canFocus = true;

	constructor(private el: ElementRef<any>) { }

	ngAfterContentInit() {
		if (this.canFocus) {
			setTimeout(() => {
				this.el.nativeElement.focus();
			}, 0);
		}
	}
}
