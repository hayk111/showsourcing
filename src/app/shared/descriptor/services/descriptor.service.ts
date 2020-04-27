import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Descriptor } from '~core/erm3/models/descriptor.model';
import { Property } from '../components/dynamic-form/dynamic-form.component';


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
				ctrls[prop.definition.name] = [
					prop.defaultValue ? JSON.parse(prop.defaultValue) : null,
					...validators
				];
			})
		);
		return this.fb.group(ctrls, options);
	}

	descriptorToValueObject(descriptor: Descriptor) {
		const obj = {};
		descriptor.sections
			.forEach(section => section.properties.forEach(prop => {
				obj[prop.definition.name] = prop.defaultValue ? JSON.parse(prop.defaultValue) : null;
			}));
		return obj;
	}

	propertiesToObject(properties: Property[]): {} {
		const obj = {};
		properties.forEach(prop => {
			obj[prop.name] = JSON.parse(prop.value);
		});
		return obj;
	}

	objectToProperties(obj: {}): Property[] {
		return Object.entries(obj)
		.map(([name, value]) => ({ name,  value: JSON.stringify(value) }));
	}
}
