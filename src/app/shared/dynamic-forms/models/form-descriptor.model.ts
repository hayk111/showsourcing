import { CustomField } from './custom-field.model';

export class FormDescriptor {
	constructor(public fields: CustomField[], value: any = {}) {
		this.patch(value);
	}

	/** adds a value to the custom fields given an object */
	patch(value: any) {
		Object.entries(value).forEach(([k, v]) => {
			const target = this.fields.find(f => f.name === k);
			if (target)
				target.value = v;
		});
	}
}
