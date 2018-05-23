

export enum PropType {
	SUPPLIER = 'supplier',
	CATEGORY = 'category',
	EVENT = 'event',
	TEAM_MEMBERS = 'project',
	TAG = 'tag',
	PROJECT = 'project',
	PRODUCT_STATUS = 'productStatus',
	CURRENCY = 'currency',
	DIMENSION = 'dimension',
	TEXT = 'text',
	TEXTAREA = 'textarea',
	NUMBER = 'number',
	PRICE = 'price',
	TEL = 'tel',
	URL = 'url',
	EMAIL = 'email',
	DECIMAL = 'decimal',
	DATE = 'date',
	CHECKBOX = 'checkbox',
	YES_NO = 'yesNo',
}

export interface CustomField {
	name?: string;
	value?: any;
	type?: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	multiple?: boolean;
	metadata?: any;
	// for when multiple choices
	choices?: Array<any>;
}

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
		})
	}
}
