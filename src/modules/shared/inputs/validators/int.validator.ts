import { FormControl } from '@angular/forms';
import { RegexpApp } from '~utils/regexes';
const DIGITS_REGEX = /^\d+$/;

export function intValidator(input: FormControl) {
	const regex = new RegExp(RegexpApp.DIGITS);
	const isInt = regex.test(input.value);
	return isInt ? null : { int: true };
}
