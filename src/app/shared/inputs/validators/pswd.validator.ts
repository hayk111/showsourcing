import { AbstractControl } from '@angular/forms';


export const PasswordValidator = (control: AbstractControl): { [key: string]: boolean } => {
	const newPswd = control.get('newPswd');
	const confirmPswd = control.get('confirmPswd');
	if (!newPswd || !confirmPswd) return null;
	return newPswd.value === confirmPswd.value ? null : { nomatch: true };
};
