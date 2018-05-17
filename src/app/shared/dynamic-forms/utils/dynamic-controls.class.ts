import { FormControl, ValidatorFn, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { FormDescriptor, FormGroupDescriptor, FormControlDescriptor } from './custom-field.model'

export class DynamicFormControl extends FormControl {
	constructor(public descriptor: FormControlDescriptor, formState?: any,
		validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
		asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(formState, validatorOrOpts, asyncValidator);
	}
}

export class DynamicFormGroup extends FormGroup {
	constructor(
		public descriptor: FormGroupDescriptor,
		public controlsArr: Array<DynamicFormControl>,
		controls: { [key: string]: AbstractControl },
		validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
		asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(controls, validatorOrOpts, asyncValidator);
	}
}


