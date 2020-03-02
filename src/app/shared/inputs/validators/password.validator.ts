import { FormControl } from '@angular/forms';


export function passwordValidator(c: FormControl) {
	const regex = /(?=.*[a-z])(?=.*?[A-Z])(?=.{8,})/g;
	if (regex.test(c.value)) {
		return null;
	} else {
		return { lowercase: true };
	}
}

