import { Injectable, Inject } from '@angular/core';
import { FormGroupDescriptor } from '../interfaces/form-group-descriptor.interface';
import { FormControlDescriptor } from '../interfaces/form-control-descriptor.interface';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { FormDescriptor } from '../interfaces/form-descriptor.interface';
import { InputMap } from '../interfaces/input-map.interface';
import { DynamicFormControl } from '../utils/dynamic-form-control.class';

@Injectable()
export class FormBuilderService {

	constructor(@Inject('inputMap') public inputMap: InputMap) {

	}

	convertDescriptor(descriptor: FormDescriptor): FormGroup {
		const group = new FormGroup({});
		if (!descriptor.groups)
			throw Error(`descriptor must contain groups`);
		descriptor.groups.forEach(g => group.addControl(g.name, this.toFormGroup(g)));
		return group;
	}

	toFormGroup(descriptor: FormGroupDescriptor ): FormGroup {
		const group: any = {};
		descriptor.fields
			.forEach((ctrlDesc) => group[ctrlDesc.name] = this.toFormControl(ctrlDesc));
		const formGroup = new FormGroup(group);
		descriptor.group = formGroup;
		return formGroup;
	}

	toFormControl(ctrlDesc: FormControlDescriptor, validators: Array<ValidatorFn> = []): DynamicFormControl {
		const value = ctrlDesc.value || '';
		if (ctrlDesc.required)
			validators.push(Validators.required);
		const ctrl = new DynamicFormControl(value, validators);
		return ctrl;
	}

	addValidators(control: AbstractControl, validators: Array<ValidatorFn> ) {
		const curr = control.validator;
		control.validator = Validators.compose([curr, ...validators]);
	}
}
