import { FormArray, FormGroup, AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms/src/model';
import { FormBuilderService } from '../services/form-builder.service';

export class DynamicFormArray extends FormArray {

	descriptor;
	fbSrv: FormBuilderService;

	constructor(controls: AbstractControl[], descriptor,
							fbSrv: FormBuilderService,
							validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
							asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
		super(controls, validatorOrOpts, asyncValidator);
		this.descriptor = descriptor;
		this.fbSrv  = fbSrv;
	}

	patchValue(obj: any) {
		if (obj.length > this.controls.length) {
			this.addMissing(obj);
		}
		super.patchValue(obj);
	}

	addMissing(arr: Array<any>) {
		const startIndex = this.controls.length;
		const endIndex = arr.length - 1;
		for (let i = startIndex; i <= endIndex; i++) {
			this.controls[i] = this.fbSrv.toFormGroup(this.descriptor);
		}
	}
}
