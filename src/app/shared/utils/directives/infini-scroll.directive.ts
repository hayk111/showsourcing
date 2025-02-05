import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';


@Directive({
	selector: '[infiniScroll]',
})
export class InfiniScrollDirective implements OnInit {
	@Output() topReached = new EventEmitter();
	@Output() bottomReached = new EventEmitter();
	private topReached$ = new Subject();
	private bottomReached$ = new Subject();
	// ms
	@Input() throttleTime = 400;
	// distance of the view height at which point we trigger the event
	// at 0 only triggers at end (when we can't scroll anymore)
	@Input() topDistance = 0;
	// default distance to load new information
	@Input() bottomDistancePercent = 0.80;
	private el: HTMLElement;
	// to know the scroll direction
	private lastScrollTop;

	constructor(private elRef: ElementRef, private renderer: Renderer2) {
		// throttle output events
		this.topReached$
			.pipe(throttleTime(this.throttleTime))
			.subscribe(_ => this.topReached.emit());
		this.bottomReached$
			.pipe(throttleTime(this.throttleTime))
			.subscribe(_ => this.bottomReached.emit());
	}

	ngOnInit() {
		this.el = this.elRef.nativeElement;
		this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
	}

	@HostListener('scroll', ['$event'])
	onScroll(e) {
		const scrollTop = e.target.scrollTop;
		const clientHeight = e.target.clientHeight;
		if (this.shouldEmitBottom(clientHeight, scrollTop)) {
			this.bottomReached$.next();
		}
		if (this.shouldEmitTop(scrollTop)) {
			this.topReached$.next();
		}
	}

	shouldEmitBottom(clientHeight, scrollTop) {
		return (
			this.isDown(scrollTop) &&
			clientHeight + scrollTop >= this.el.scrollHeight * this.bottomDistancePercent
		);
	}

	shouldEmitTop(scrollTop) {
		return this.isUp(scrollTop) && scrollTop <= this.topDistance;
	}

	isDown(scrollTop) {
		/* assigning to scroll top on isUp*/
		return scrollTop > (this.lastScrollTop || 0);
	}

	isUp(scrollTop) {
		// assuming that first scroll is a down scroll
		const r = (this.lastScrollTop || 15000) >= scrollTop;
		this.lastScrollTop = scrollTop;
		return r;
	}
}
