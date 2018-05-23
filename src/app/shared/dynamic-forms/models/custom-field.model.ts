
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

