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

	onBlur() {
		let value = this.value;
		if (this.type === 'number') value = +value;
		super.onBlur();
	}

	onChange(v) {
		this.value = v;
		// needed because some api expect number instead of str
		if (this._type === 'number' || this._type === 'decimal') {
			this.value = +v;
		}
		super.onChange(this.value);
	}

	get type() {
		switch (this._type) {
			case 'number':
			case 'decimal':
				return 'text';
			default:
				return this._type;
		}
	}

	set type(type: string) {
		this._type = type;
	}
}
