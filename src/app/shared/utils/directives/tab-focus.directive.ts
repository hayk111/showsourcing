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
} from '@angular/core';

@Directive({
	selector: '[tabFocus]'
})
export class TabFocusDirective implements AfterViewInit, OnDestroy {

	@Output() enter = new EventEmitter<null>();

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

	focusOrigin(origin: FocusOrigin = 'keyboard') {
		this._focusMonitor.focusVia(this.element, origin);
	}
}
