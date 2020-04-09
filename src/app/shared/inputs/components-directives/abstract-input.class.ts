import { ChangeDetectorRef, Directive, forwardRef, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** factory function to create an access provider */
export function makeAccessorProvider(type: any) {
	return {
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => type),
		multi: true,
	};
}

// The goal of this class is to abstract the value accessor implementation
@Directive()
// tslint:disable-next-line: directive-class-suffix
export class AbstractInput implements ControlValueAccessor {
	@Input() value: any = '';
	public disabled: boolean;
	protected onTouchedFn = (any?: any) => { };
	protected onChangeFn = (any?: any) => { };

	constructor(@Optional() protected cd?: ChangeDetectorRef) {}

	// Called when patchValue or setValue is called on the form control
	// Allows Angular to update the model
	writeValue(value: any): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChangeFn = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouchedFn = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

}
