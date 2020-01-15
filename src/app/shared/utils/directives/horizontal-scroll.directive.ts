import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Directive({
	selector: '[horizontalScroll]',
})
export class HorizontalScrollDirective implements OnInit {
	private el: HTMLElement;

	constructor(private elRef: ElementRef, private scrollDispatcher: ScrollDispatcher) {
	}

	ngOnInit() {
		this.el = this.elRef.nativeElement;

		if (this.elRef.nativeElement.addEventListener) {
			this.elRef.nativeElement.addEventListener('mousewheel', this.scrollHorizontally.bind(this), false);
			this.elRef.nativeElement.addEventListener('DOMMouseScroll', this.scrollHorizontally.bind(this), false);
		} else {
			this.elRef.nativeElement.attachEvent('onmousewheel', this.scrollHorizontally.bind(this));
		}
	}

	@HostListener('mouseenter', ['$event']) onEnter( e: MouseEvent ) {
		this.disableScroll();
	}

	@HostListener('mouseleave', ['$event']) onLeave( e: MouseEvent ) {
		this.enableScroll();
	}

	// disable window scroll in chrome and other browsers
	private disableScroll() {
		if (window.addEventListener) { // older FF
			window.addEventListener('DOMMouseScroll', this.preventDefault, false);
		}
		document.addEventListener('wheel', this.preventDefault, {passive: false}); // Disable scrolling in Chrome
		// window.onwheel = this.preventDefault;
		window.ontouchmove  = this.preventDefault; // mobile
		document.onkeydown  = this.preventDefaultForScrollKeys;
	}

	// enable window scroll in chrome and other browsers
	private enableScroll() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
		}
		document.removeEventListener('wheel', this.preventDefault); // Enable scrolling in Chrome
		// window.onwheel = null;
		window.ontouchmove = null;
		document.onkeydown = null;
	}

	private preventDefaultForScrollKeys(e: any) {
		const keys = {37: 1, 38: 1, 39: 1, 40: 1};

		if (keys[e.keyCode]) {
			this.preventDefault(e);
			return false;
		}
	}

	private preventDefault(e: any) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	private scrollHorizontally(e: any) {
		e = window.event || e;
		const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		this.elRef.nativeElement.scrollLeft -= (delta * 50);
		e.preventDefault();
	}

}
