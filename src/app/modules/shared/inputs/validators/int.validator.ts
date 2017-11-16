import { FormControl } from '@angular/forms';
const DIGITS_REGEX = /^\d+$/;

export function intValidator(input: FormControl) {
	const regex = new RegExp(DIGITS_REGEX);
	const isInt = regex.test(input.value);
	return isInt ? null : { int: true };
}

