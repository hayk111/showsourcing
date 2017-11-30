import { Component, OnInit, Input, forwardRef, HostBinding,
	ChangeDetectorRef, ViewChild, Renderer2, Injector, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';
import Log from '../../../../../utils/logger/log.class';
import { FormBuilderService } from '../../../form-builder/services/form-builder.service';
import { AbstractInput } from '../../abstract-input.class';
import { RegexpApp } from '../../../../../utils/regexes';

@Component({
	selector: 'input-app',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	]
})
export class InputComponent extends AbstractInput implements OnInit {
	@HostBinding('class.flexColumn') flex = true;
	// regex is so we can disable some keys from the input
	// for example the number input shouldn't let us type letters
	private regex;
	@Input() margin = true;
	@Output() blur = new EventEmitter();
	@Output() enter = new EventEmitter();

	constructor(protected inj: Injector) { super(inj); }

	ngOnInit() {
		super.ngOnInit();
		this.addValidatorForType();
	}

	onEnter() {
		this.enter.emit(this.value);
	}

	private addValidatorForType() {
		switch (this.type) {
			case 'number':
				this.regex = new RegExp(RegexpApp.DIGITS);
				break;
			case 'url':
				break;
			case 'tel':
				this.regex = new RegExp(RegexpApp.PHONE);
				break;
		}
	}

	onKeyDown(event: KeyboardEvent) {
		if (!this.regex)
			return;

		if (this.checkControls(event))
			return;
		// we only have to test for the entered key (and not currentvalue + entered key)
		// as pattern for this input only allows a subset of the keys.
		if (this.regex.test(event.key))
			return;
		// if the pattern matching fails we don't write anything
		event.preventDefault();
	}

	// checks for backspace, ctrl + key etc.
	checkControls(e): boolean {
		if (e.keyCode === 8 || e.keyCode === 46
			|| e.keyCode === 37 || e.keyCode === 39) {
				 return true;
		}

		// Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
		if ((e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 67) && (e.ctrlKey === true || e.metaKey === true))
			return true;

		// Allow: home, end, left, right, down, up
		if (e.keyCode >= 35 && e.keyCode <= 40)
			return true;

	}

	onBlur() {
		this.blur.emit();
	}

}
