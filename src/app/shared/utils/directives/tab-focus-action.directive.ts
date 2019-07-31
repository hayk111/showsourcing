import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
	ChangeDetectorRef,
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	NgZone,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';

@Directive({
	selector: '[tabFocusAction]',
	exportAs: 'tabFocusActionId',
	host: {
		'[attr.tabindex]': '0'
	}
})
// the purpose of this directive is to add keyboard focus to elements that do not have focus by default (e.g. <div>)
// furthermore this components listens and emits events, since the purpose on focusing elements
// is to actually interact with them most of the time too
export class TabFocusActionDirective implements OnDestroy, OnInit {

	@Output() keyEnter = new EventEmitter<null>();
	@Output() keydown = new EventEmitter<string>();

	@HostListener('keydown.enter', ['$event'])
	onKeydownEnter(event: KeyboardEvent) {
		event.stopImmediatePropagation();
		this.keyEnter.emit();
	}

	@HostListener('keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		// only characters or enter key or space key
		if ((event.key && event.key.length === 1) || event.keyCode === 32) {
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

	ngOnInit() {
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
