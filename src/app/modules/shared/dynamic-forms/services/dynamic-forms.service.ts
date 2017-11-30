import { Injectable, Inject } from '@angular/core';
import { DynamicFormGroup, DynamicFormControl } from '../utils/dynamic-controls.class';
import { FormDescriptor, FormGroupDescriptor, FormControlDescriptor } from '../utils/descriptors.interface';
import { Validators } from '@angular/forms';
import { RegexpApp } from '../../../../utils/regexes';
import { InputMap } from '../utils/input-map.interface';

@Injectable()
export class DynamicFormsService {

	constructor(@Inject('inputMap') public inputMap: InputMap) {}

	// transform formGroupDescriptor to DynamicFormGroup
	toDynamicFormGroup(groupDesc: FormGroupDescriptor ): DynamicFormGroup {
		const group: any = {};
		const controlsArray = [];
		// we add a formControl for each field.
		groupDesc.fields
			.forEach((ctrlDesc) => {
				const ctrl = this.toDynamicFormControl(ctrlDesc);
				group[ctrlDesc.name] = ctrl;
				controlsArray.push(ctrl);
			});
		const formGroup = new DynamicFormGroup(groupDesc, controlsArray, group);
		return formGroup;
	}

	toDynamicFormControl(ctrlDesc: FormControlDescriptor): DynamicFormControl {
		const value = ctrlDesc.value || '';
		const ctrl = new DynamicFormControl(value, this.createValidators(ctrlDesc));
		ctrl.descriptor = ctrlDesc;
		return ctrl;
	}

	createValidators(ctrlDesc: FormControlDescriptor) {
		const validators = [];
		if (ctrlDesc.required)
			validators.push(Validators.required);
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
