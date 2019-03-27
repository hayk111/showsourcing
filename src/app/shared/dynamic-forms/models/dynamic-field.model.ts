
export interface DynamicField {
	name?: string;
	value?: any;
	type?: string;
	metadata?: any;
	label?: string;
	placeholder?: string;
	required?: boolean;
	multiple?: boolean;
	// for when multiple choices
	choices?: Array<any>;
}

