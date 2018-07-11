import { Directive, Input, HostListener } from '@angular/core';
import { RegexpApp } from '~utils';

@Directive({
	selector: '[restrictInput]',
})
export class RestrictInputDirective {
	regex: RegExp;

	constructor() { }

	@Input('restrictInput')
	set inputType(type: string) {
		switch (type) {
			case 'number':
				this.regex = new RegExp(RegexpApp.DIGITS);
				break;
			case 'decimal':
				this.regex = new RegExp(RegexpApp.DECIMAL);
				break;
			case 'tel':
				this.regex = new RegExp(RegexpApp.PHONE);
				break;
			case 'password':
				this.regex = new RegExp(RegexpApp.PASSWORD_INPUT);
				break;
		}
	}

	// listens for keypress and prevent some characters if they don't fit the regex
	@HostListener('keypress', ['$event'])
	onKeyPress(event: KeyboardEvent) {
		if (!this.regex) return;

		const value = String.fromCharCode(event.charCode);
		if (this.regex.test(value)) return;
		// if the pattern matching fails we don't write anything
		event.preventDefault();
	}

}
