import { Directive, HostBinding, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';


@Directive({
	selector: '[autoGrows]',
})
export class TextareaAutoGrowsDirective implements OnInit {

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
		this.renderer.setStyle(this.el.nativeElement, 'resize', 'none');
		this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
		this.onInput();
	}

	@HostListener('input')
	onInput() {
		this.renderer.setStyle(this.el.nativeElement, 'height', this.el.nativeElement.scrollHeight + 'px');
	}

}
