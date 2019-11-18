import { FormControl } from '@angular/forms';
import { RegexpApp } from '~utils/regexes';

export function urlValidator(input: FormControl) {
	const regex = new RegExp(RegexpApp.URL);
	const isTel = regex.test(input.value);
	return isTel ? null : { url: true };
}
