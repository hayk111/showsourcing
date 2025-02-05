import { ChangeDetectorRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TrackingComponent } from '~utils/tracking-component';

/** factory function to create an access provider */
export function makeAccessorProvider(type: any) {
	return {
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => type),
		multi: true,
	};
}

// The goal of this class is to abstract the value accessor implementation
export class AbstractInput extends TrackingComponent implements ControlValueAccessor {
	@Input() value: any = '';
	public disabled: boolean;
	protected onTouchedFn = (any?: any) => { };
	protected onChangeFn = (any?: any) => { };

	constructor(protected cd: ChangeDetectorRef) {
		super();
	}

	// Implemented as part of ControlValueAccessor.
	// to give accessor its formControl value associated to it
	writeValue(value: any): void {
		this.value = value;
		this.cd.markForCheck();
	}

	// Implemented as part of ControlValueAccessor.
	// this is to notify a formControl that the value has changed
	// this has nothing to do with the change event (altough when a change event occurs this will as well)
	registerOnChange(fn: any): void {
		this.onChangeFn = (value) => {
			fn(value);
			this.cd.markForCheck();
		};
	}

	// Implemented as part of ControlValueAccessor.
	registerOnTouched(fn: any): void {
		this.onTouchedFn = (value) => {
			fn(value);
			this.cd.markForCheck();
		};
	}

	// Implemented as part of ControlValueAccessor.
	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

}
