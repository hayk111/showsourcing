import { ControlValueAccessor, AbstractControl, NgControl, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { Input, Injector, OnInit, AfterViewInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { Log } from '@utils/index';
import { AutoUnsub } from '@utils/index';
import { ChangeDetectorRef } from '@angular/core';

export function makeAccessorProvider(type: any) {
	return 		{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => type),
		multi: true
	};
}

// The goal of this class is to abstract the value accessor implementation
export class AbstractInput extends AutoUnsub implements ControlValueAccessor, OnInit {
	private static inputSeedId = 0;
	inputId = AbstractInput.inputSeedId++;
	disabled: boolean;
	onTouchedFn: Function;
	onChangeFn: Function;
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() label: string;
	@Input() required = false;
	@Input() metadata: any;
	@Input() value: any = '';
	@Output() update = new EventEmitter<any>();

	constructor() {
		super();
	}

	ngOnInit() {}

	// changes the formControl value and emits an update event with same value
	onChange(value: any) {
		this.value = value;
		if (this.onChangeFn)
			this.onChangeFn(value);
		this.update.emit(value);
	}

	onBlur() {
		if (this.onTouchedFn)
			this.onTouchedFn();
	}

	// to give accessor its the formControl value associated to it
	writeValue(value: any): void {
		this.value = value;
	}

	// this is to notify a formControl that the value has changed
	// this has nothing to do with the (change) event
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


