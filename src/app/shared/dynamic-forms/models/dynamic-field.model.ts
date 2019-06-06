
export interface DynamicField {
	name?: string;
	value?: any;
	type?: DynamicFieldType;
	metadata?: any;
	label?: string;
	placeholder?: string;
	required?: boolean;
	multiple?: boolean;
	// when multiple choices
	choices?: Array<any>;
}

export type DynamicFieldType =
	'text' | 'tel' | 'number' | 'decimal' | 'days' | 'textarea' | 'selector' | 'boolean' | 'price'
	| 'priceMatrix' | 'packaging' | 'title' | 'url' | 'email';
