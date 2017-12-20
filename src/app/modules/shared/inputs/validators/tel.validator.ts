import { FormControl } from '@angular/forms';
import { RegexpApp } from '../../../../utils/regexes';

export function telValidator(input: FormControl) {
	const regex = new RegExp(RegexpApp.PHONE);
	const isTel = regex.test(input.value);
	return isTel ? null : { tel: true };
}

