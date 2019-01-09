import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements OnInit {
	constructor(private el: ElementRef<any>) { }
	ngOnInit() {
		this.el.nativeElement.focus();
	}
}
