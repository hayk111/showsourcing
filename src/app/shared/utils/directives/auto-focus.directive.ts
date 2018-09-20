import { Directive, ElementRef, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { InputDirective } from '~shared/inputs';

@Directive({
	selector: '[autoFocus]'
})
export class AutoFocusDirective implements OnInit {
	constructor(private el: ElementRef<any>) { }
	ngOnInit() {
		this.el.nativeElement.focus();
	}
}
