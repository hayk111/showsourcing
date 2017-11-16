import { FormControl } from '@angular/forms';
const PHONE_REGEX = /^[0-9\.\-\/\+\s()]+$/;

export function telValidator(input: FormControl) {
	const regex = new RegExp(PHONE_REGEX);
	const isTel = regex.test(input.value);
	return isTel ? null : { tel: true };
}

