


export interface FormControlDescriptor {
	name?: string;
	value?: any;
	fieldType?: string;
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
