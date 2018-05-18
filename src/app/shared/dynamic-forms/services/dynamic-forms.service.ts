import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormDescriptor, FormGroupDescriptor, FormControlDescriptor } from '../utils/custom-field.model'
import { RegexpApp } from '~utils/regexes';

@Injectable()
export class DynamicFormsService {
	constructor() { }

	getDescriptor() {
		// return this.store.select(selectCustomField(entityRepr.descriptorName));
	}

	// transform formGroupDescriptor to DynamicFormGroup
	toFormGroup(formDesc: FormDescriptor): FormGroup {
		const formGroup = new FormGroup({});
		formDesc.groups.forEach(gDesc => {
			gDesc.fields.forEach(ctrlDesc => {
				const ctrl = this.toDynamicFormControl(ctrlDesc);
				formGroup.addControl(ctrlDesc.name, ctrl);
			});
		});
		return formGroup;
	}

	private addCtrlToFormGroup(gDesc: FormGroupDescriptor, formGroup) {
		gDesc.fields.forEach(ctrlDesc => {
			const name = ctrlDesc.name.replace(/\/s/g, '');
			const ctrl = this.toDynamicFormControl(ctrlDesc);
			formGroup.addControl(ctrlDesc.name, ctrl);
		});
	}

	toDynamicFormControl(ctrlDesc: FormControlDescriptor): FormControl {
		const value = ctrlDesc.value || '';
		const ctrl = new FormControl(value);
		return ctrl;
	}

	createValidators(ctrlDesc: FormControlDescriptor) {
		const validators = [];
		if (ctrlDesc.required) validators.push(Validators.required);
		switch (ctrlDesc.fieldType) {
			case 'number':
				validators.push(Validators.pattern(RegexpApp.DIGITS));
				break;
			case 'url':
				validators.push(Validators.pattern(RegexpApp.URL));
				break;
			case 'tel':
				validators.push(Validators.pattern(RegexpApp.PHONE));
				break;
		}
		return Validators.compose(validators);
	}
}
