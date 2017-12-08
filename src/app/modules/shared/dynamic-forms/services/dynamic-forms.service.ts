import { Injectable, Inject } from '@angular/core';
import { DynamicFormGroup, DynamicFormControl } from '../utils/dynamic-controls.class';
import { FormDescriptor, FormGroupDescriptor, FormControlDescriptor } from '../utils/descriptors.interface';
import { Validators, FormGroup } from '@angular/forms';
import { RegexpApp } from '../../../../utils/regexes';
import { InputMap } from '../utils/input-map.interface';
import { Store } from '@ngrx/store';
import { EntityRepresentation } from '../../../store/model/filter.model';
import { selectCustomField } from '../../../store/selectors/custom-fields.selector';

@Injectable()
export class DynamicFormsService {

	constructor(private store: Store<any>) {}

	getDescriptor(entityRepr: EntityRepresentation) {
		return this.store.select(selectCustomField(entityRepr.descriptorName));
	}

	// transform formGroupDescriptor to DynamicFormGroup
	toFormGroup(formDesc: FormDescriptor, formGroup: FormGroup ): FormGroup {
		formDesc.groups.forEach(gDesc => {
			gDesc.fields.forEach((ctrlDesc) => {
				const ctrl = this.toDynamicFormControl(ctrlDesc);
				// if the name of the group is basic info the props are as is, while if it's something else
				// props begin with x-
				const name = gDesc.name === 'Basic info' ? ctrlDesc.name : 'x-' + ctrlDesc.name;
				formGroup.addControl(name, ctrl);
			});
		});
		return formGroup;
	}

	private addCtrlToFormGroup(gDesc: FormGroupDescriptor, formGroup) {
		gDesc.fields.forEach((ctrlDesc) => {
			const name = ctrlDesc.name.replace(/\/s/g, '');
			const ctrl = this.toDynamicFormControl(ctrlDesc);
			formGroup.addControl(ctrlDesc.name, ctrl);
		});
	}

	toDynamicFormControl(ctrlDesc: FormControlDescriptor): DynamicFormControl {
		const value = ctrlDesc.value || '';
		const ctrl = new DynamicFormControl(value);
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
