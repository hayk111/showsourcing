export enum FieldType {
	SUPPLIER = 'suppliers',
	CATEGORY = 'categories',
	EVENT = 'events',
	TEAM_MEMBERS = 'teamMembers',
	TAG = 'tags',
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

export interface FormControlDescriptor {
	name?: string;
	value?: any;
	fieldType?: FieldType;
	label?: string;
	placeholder?: string;
	required?: boolean;
	metadata?: any;
	// for when multiple choices
	choices?: Array<any>;
}

export interface FormGroupDescriptor {
	name: string;
	fields: Array<FormControlDescriptor | FormGroupDescriptor>;
	class?: string;
}

export interface FormDescriptor {
	groups: Array<FormGroupDescriptor>;
}
