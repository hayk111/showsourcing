import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyDescriptor } from '~core/erm3';
import { Descriptor } from '~core/erm3/models/descriptor.model';

@Injectable({ providedIn: 'root' })
export class DescriptorService {

	constructor(private fb: FormBuilder) {}

	descriptorToFormGroup(descriptor: Descriptor, options?: AbstractControlOptions): FormGroup {
		const ctrls = {};
		descriptor.sections
			.forEach(section => section.properties.forEach(prop => {
				const validators = [];
				if (prop.required) {
					validators.push(Validators.required);
				}
				if (prop.definition && prop.definition.name) {
					ctrls[prop.definition.name] = [
						prop.defaultValue ? JSON.parse(prop.defaultValue) : null,
						...validators
					];
				}
			})
		);
		return this.fb.group(ctrls, options);
	}

	private getValidators(prop: PropertyDescriptor) {
		const validators = [];
		if (prop.required) {
			validators.push(Validators.required);
		}
	}

	descriptorToValueObject(descriptor: Descriptor) {
		const obj = {};
		descriptor.sections
			.forEach(section => section.properties.forEach(prop => {
				obj[prop.definition.name] = prop.defaultValue ? JSON.parse(prop.defaultValue) : null;
			}));
		return obj;
	}

}
