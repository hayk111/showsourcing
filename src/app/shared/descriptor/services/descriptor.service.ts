import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyDescriptor } from '~core/erm3';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';
import { Descriptor } from '~core/erm3/models/descriptor.model';

@Injectable({ providedIn: 'root' })
export class DescriptorService {

	constructor(private fb: FormBuilder) {}

	descriptorToFormGroup(section: SectionWithColumns, options?: AbstractControlOptions): FormGroup {
		const ctrls = {};

		if (section && section.properties) {
			section.properties.forEach(prop => {
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
			});
		}

		return this.fb.group(ctrls, options);
	}

	private getValidators(prop: PropertyDescriptor) {
		const validators = [];
		if (prop.required) {
			validators.push(Validators.required);
		}
	}

	descriptorToValueObject(section: SectionWithColumns) {
		const obj = {};
		if (section && section.properties) {
			section.properties.forEach(prop => {
				obj[prop.definition.name] = prop.defaultValue ? JSON.parse(prop.defaultValue) : null;
			});
		}
		return obj;
	}

}
