import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ExtendedField } from '~core/models/extended-field.model';
import { CustomField } from '~shared/dynamic-forms/models';

@Injectable({
	providedIn: 'root'
})
export class DynamicFormsService {
	constructor() { }

	/** creates a form array given an array of extended fields */
	toFormArray(fields: ExtendedField[]): FormArray {
		const ctrls = fields.map(field => this.toFormControl(field));
		return new FormArray(ctrls);
	}

	/** transforms a extended field into a form control */
	toFormControl(field: ExtendedField): FormControl {
		const value = field.value;
		return new FormControl(value);
	}

}
