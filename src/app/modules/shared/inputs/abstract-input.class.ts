import { ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';
import { Input, Injector, OnInit, AfterViewInit } from '@angular/core';
import Log from '../../../utils/logger/log.class';

// The goal of this class is to abstract the value accessor implementation
export class AbstractInput implements ControlValueAccessor, OnInit, AfterViewInit {
	private static inputSeedId = 0;
	inputId = AbstractInput.inputSeedId++;
	disabled: boolean;
	onTouchedFn: Function;
	onChangeFn: Function;
	control: AbstractControl;
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() label: string;
	@Input() required = false;
	value: any;

	constructor(protected inj: Injector) {  }

	ngOnInit() {
		this.control = this.inj.get(NgControl);
	}

	// ok this method is here to try to notify someone if he forgots to call super.ngOnInit() when
	// shadowing the ngOnInit from this class (when extending it).
	// This will only work if we don't also shadow the ngAfterViewInit(), but since that is unlikely
	// this should do the trick.
	ngAfterViewInit() {
		if (! this.control)
			Log.warn('You probably forgot to call super.ngOnInit() in an abstract Input');
	}

	onChange(event: any) {
		if (this.onChangeFn)
			this.onChangeFn(event);
	}

	onBlur() {
		if (this.onTouchedFn)
			this.onTouchedFn();
	}

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
