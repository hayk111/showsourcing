import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicField } from '~shared/dynamic-forms/models';
import { RegexpApp } from '~utils/regexes';

@Injectable({
	providedIn: 'root'
})
export class DynamicFormsService {
	constructor() { }

	/** creates a form group given an array of custom fields */
	toFormGroup(customFields: DynamicField[]): FormGroup {
		const formGroup = new FormGroup({});
		customFields.forEach(field => {
			const ctrl = this.toFormControl(field);
			formGroup.addControl(field.name, ctrl);
		});
		return formGroup;
	}

	/** transforms a custom field into a form control */
	toFormControl(field: DynamicField): FormControl {
		// when multiple it means we are dealing with an array of values
		const value = field.value;
		const validators = this.createValidators(field);
		const ctrl = new FormControl(value, validators);
		return ctrl;
	}

	private createValidators(field: DynamicField) {
		const validators = [];
		if (field.required) validators.push(Validators.required);
		switch (field.type) {
			case 'number':
				validators.push(Validators.pattern(RegexpApp.DIGITS));
				break;
			case 'url':
				validators.push(Validators.pattern(RegexpApp.URL));
				break;
			case 'tel':
				validators.push(Validators.pattern(RegexpApp.PHONE));
				break;
			case 'email':
				validators.push(Validators.email);
		}
		return Validators.compose(validators);
	}

}
