import { FormControl, ValidatorFn, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { AbstractControlOptions, AbstractControl } from '@angular/forms/src/model';
import { FormControlDescriptor, FormGroupDescriptor } from './descriptors.interface';

export class DynamicFormControl extends FormControl {
	constructor(public descriptor: FormControlDescriptor, formState?: any,
		validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
		asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(formState, validatorOrOpts, asyncValidator);
	}
}

export class DynamicFormGroup extends FormGroup {
	constructor(
		public descriptor: FormGroupDescriptor,
		public controlsArr: Array<DynamicFormControl>,
		controls: { [key: string]: AbstractControl},
		validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
		asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(controls, validatorOrOpts, asyncValidator);
	}
}


