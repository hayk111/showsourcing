import { ElementRef, Directive } from '@angular/core';


@Directive({ selector: '[focusable]'})
export class FocusableDirective {

	constructor(
		protected _elementRef: ElementRef,
	) {}

	/** Focuses the input and sets the carret at the end */
	focus(): void {
		if (!this.isInput() && !this.isTextarea() && !this.isSelect()) {
			throw Error('the focus method must be overrided if inputApp is used on something else than input, textarea or select');
		}
		// set timeout is used in case the input is not rendered when we call focus()
		// when using *ngIf and such.
		setTimeout(_ => {
			const input = this._elementRef.nativeElement;
			const length = input.value.length;
			input.focus();
			input.setSelectionRange(length, length);
		});
	}

	/** Selects the content of the input */
	select(): void {
		if (!this.isInput() && !this.isTextarea()) {
			throw Error('the focus method must be overrided if inputApp is used on something else than input, textarea');
		}
		setTimeout(_ => {
			this._elementRef.nativeElement.select();
		});
	}

	/** Determines if the component host is a textarea. If not recognizable it returns false. */
	protected isInput() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'input' : false;
	}

	/** Determines if the component host is a textarea. If not recognizable it returns false. */
	protected isTextarea() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
	}

	/** Determines if the component host is a select. If not recognizable it returns false. */
	protected isSelect() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'select' : false;
	}
}
