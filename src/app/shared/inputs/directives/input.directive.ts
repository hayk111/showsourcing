import { Directive, Input, ElementRef, Self, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

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
	selector: '[inputApp]'
})
export class InputDirective {
	protected static NEXT_UID = 0;

	constructor(protected _elementRef: ElementRef, @Optional() @Self() public control: NgControl) { }

	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value || this._uid; }
	protected _id: string;
	protected _uid = '' + InputDirective.NEXT_UID++;

	/** Whether the element is readonly. */
	@Input()
	get readonly(): boolean { return this._readonly; }
	set readonly(value: boolean) { this._readonly = value; }
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
		if (!this._isTextarea()) {
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
	}
	protected _disabled = false;



	/** Determines if the component host is a textarea. If not recognizable it returns false. */
	protected _isTextarea() {
		const nativeElement = this._elementRef.nativeElement;
		const nodeName = nativeElement.nodeName;
		return nodeName ? nodeName.toLowerCase() === 'textarea' : false;
	}

	/** Focuses the input. */
	focus(): void { this._elementRef.nativeElement.focus(); }

}
