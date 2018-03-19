import { ChangeDetectionStrategy, Component, Input, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegexpApp } from '~utils';

import { AbstractInput, makeAccessorProvider } from '../../abstract-input.class';

@Component({
	selector: 'input-app',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [makeAccessorProvider(InputComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends AbstractInput implements OnInit {
	// regex is so we can disable some keys from the input
	// for example the number input shouldn't let us type letters
	private regex;
	@Input() readonly: boolean;
	@Input() formControl: FormControl;
	@HostBinding('class.inline')
	get isInline(): Boolean {
		return this.type === 'text-inline';
	}
	private _type: string;

	constructor() {
		super();
	}

	ngOnInit() {
		this.addValidatorForType();
	}

	private addValidatorForType() {
		switch (this._type) {
			case 'number':
				this.regex = new RegExp(RegexpApp.DIGITS);
				break;
			case 'decimal':
				this.regex = new RegExp(RegexpApp.DECIMAL);
				break;
			case 'url':
				break;
			case 'tel':
				this.regex = new RegExp(RegexpApp.PHONE);
				break;
		}
	}

	onKeyDown(event: KeyboardEvent) {
		if (!this.regex) return;

		if (this.checkControls(event)) return;
		// we only have to test for the entered key (and not currentvalue + entered key)
		// as pattern for this input only allows a subset of the keys.
		if (this.regex.test(event.key)) return;
		// if the pattern matching fails we don't write anything
		event.preventDefault();
	}

	// checks for backspace, ctrl + key etc.
	checkControls(e): boolean {
		if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39) {
			return true;
		}

		// Allow: Ctrl+A,Ctrl+C,Ctrl+V, Command+A
		if (
			(e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 67) &&
			(e.ctrlKey === true || e.metaKey === true)
		)
			return true;

		// Allow: home, end, left, right, down, up
		if (e.keyCode >= 35 && e.keyCode <= 40) return true;
	}

	onBlur() {
		let value = this.value;
		if (this.type === 'number') value = +value;
		super.onBlur();
	}

	onChange(v) {
		this.value = v;
		// needed because some api expect number instead of str
		if (this.type === 'number') {
			this.value = +v;
		}
		super.onChange(this.value);
	}

	get type() {
		switch (this._type) {
			case 'decimal':
				return 'number';
			default:
				return this._type;
		}
	}

	set type(type: string) {
		this._type = type;
	}
}
