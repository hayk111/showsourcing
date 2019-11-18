import { AbstractControl } from '@angular/forms';
import { RegexpApp } from '~utils/regexes';

export function phoneValidator() {
	const reg: RegExp = new RegExp(RegexpApp.PHONE);
	return (control: AbstractControl): { [key: string]: any } | null => {
		const forbidden = reg.test(control.value);
		return forbidden ? { 'invalidPhone': { vlaue: control.value } } : null;
	};
}
