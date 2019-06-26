import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
	AfterViewInit,
	ChangeDetectorRef,
	Directive,
	ElementRef,
	EventEmitter,
	NgZone,
	OnDestroy,
	Output,
	HostListener,
} from '@angular/core';

@Directive({
	selector: '[tabFocus]',
	exportAs: 'tabFocusId',
	host: {
		'[attr.tabindex]': '0'
	}
})
export class TabFocusDirective implements AfterViewInit, OnDestroy {

	@Output() keyEnter = new EventEmitter<null>();

	@HostListener('keydown.enter', ['$event'])
	onKeydownEnter(event) {
		this.keyEnter.emit();
	}

	elementOrigin = this.formatOrigin(null);

	constructor(
		private _focusMonitor: FocusMonitor,
		private _cdr: ChangeDetectorRef,
		private _ngZone: NgZone,
		private element: ElementRef<any>) { }

	ngAfterViewInit() {
		this._focusMonitor.monitor(this.element)
			.subscribe(origin => this._ngZone.run(() => {
				this.elementOrigin = this.formatOrigin(origin);
				this._cdr.markForCheck();
			}));
	}

	ngOnDestroy() {
		this._focusMonitor.stopMonitoring(this.element);
	}

	formatOrigin(origin: FocusOrigin): string {
		return origin ? origin + ' focused' : 'blurred';
	}

	// function to focus the element on the directive once again (focus via keyboard)
	focus(origin: FocusOrigin = 'keyboard') {
		this._focusMonitor.focusVia(this.element, origin);
	}
}
