import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
	AfterViewInit,
	ChangeDetectorRef,
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	NgZone,
	OnDestroy,
	Output,
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
	@Output() keydown = new EventEmitter<string>();

	@HostListener('keydown.enter', ['$event'])
	onKeydownEnter(event) {
		this.keyEnter.emit();
	}

	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		// only characters or enter key or space key
		if ((event.key && event.key.length === 1) || event.keyCode === 13 || event.keyCode === 32) {
			// we use this since the space event would reset scroll
			event.preventDefault();
			this.keydown.emit(event.key);
		}
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
	focusOrigin(origin: FocusOrigin = 'keyboard') {
		this._focusMonitor.focusVia(this.element, origin);
	}
}
