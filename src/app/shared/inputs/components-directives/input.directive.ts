import { Directive, Input, ElementRef, Self, Optional, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormFieldControlDirective } from '~shared/inputs/components-directives/form-field-control.directive';

const supportedTypes = new Set([
	'color',
	'date',
	'datetime-local',
	'email',
	'month',
	'number',
	'password',
	'search',
	'tel',
	'text',
	'time',
	'url',
	'week',
]);



@Directive({
	selector: '[inputApp]',
	host: {
		'(blur)': 'focussed = false',
		'(focus)': 'focussed = true',
	},
	providers: [{ provide: FormFieldControlDirective, useExisting: InputDirective }],

})
export class InputDirective extends FormFieldControlDirective {
	protected static NEXT_UID = 0;

	constructor(protected _elementRef: ElementRef, @Optional() @Self() public control: NgControl) {
		super(control);
	}

	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value; this.stateChanges.next(); }
	protected _id: string = 'inp-' + InputDirective.NEXT_UID++;

	/** Whether the element is readonly. */
	@Input()
	get readonly(): boolean { return this._readonly; }
	set readonly(value: boolean) { this._readonly = value; this.stateChanges.next(); }
	private _readonly = false;

	/** Whether the element is required. */
	@Input()
	get required(): boolean { return this._required; }
	set required(value: boolean) { this._required = value; }
	protected _required = false;

	/** Input type of the element. */
	@Input()
	get type(): string { return this._type; }
	set type(value: string) {
		this._type = value || 'text';
		if (!supportedTypes.has(this._type))
			throw new Error(`type ${this.type} not supported by inputApp`);
		// When using Angular inputs, developers are no longer able to set the properties on the native
		// input element. To ensure that bindings for `type` work, we need to sync the setter
		// with the native property. Textarea elements don't support the type property or attribute.
		if (!this._isTextarea() && !this._isSelect()) {
			this._elementRef.nativeElement.type = this._type;
		}
	}
	protected _type = 'text';

	/** Whether the element is disabled. */
	@Input()
	get disabled(): boolean {
		if (this.control && this.control.disabled !== null) {
			return this.control.disabled;
		}
		return this._disabled;
	}
	set disabled(value: boolean) {
		this._disabled = value;
		this.stateChanges.next();
	}
	protected _disabled = false;

	/** Whether the input is on focus */
	set focussed(value: boolean) {
		this._focussed = value;
		this.stateChanges.next();
	}
	get focussed() {
		return this._focussed;
	}
	protected _focussed = false;

	/** Whether the has not been typed into */
	get pristine() {
		return this.control.pristine;
	}

	/** Determines if the component host is a textarea. If not recognizable it returns false. */
	protected _isTextarea() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
	}

	/** Determines if the component host is a select. If not recognizable it returns false. */
	protected _isSelect() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'select' : false;
	}

	/** Focuses the input and sets the carret at the end */
	focus(): void {
		// set timeout is used in case the input is not rendered when we call focus()
		// when using *ngIf and such.
		setTimeout(_ => {
			const input = this._elementRef.nativeElement;
			const length = input.value.length;
			input.focus();
			// at this time only text input supports this
			if ((input instanceof HTMLInputElement && input.type === 'text') || this._isTextarea())
				input.setSelectionRange(length, length);
		});
	}

	/** Selects the content of the input */
	select(): void {
		setTimeout(_ => {
			this._elementRef.nativeElement.select();
		});
	}

}
