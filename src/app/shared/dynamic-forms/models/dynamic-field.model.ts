
export interface DynamicField {
	name?: string;
	value?: any;
	type?: DynamicFieldType;
	metadata?: DynamicFieldMetadata;
	label?: string;
	required?: boolean;
}

export interface DynamicFieldMetadata {
	multiple?: boolean;
	canCreate?: boolean;
	target?: string;
	hasBadge?: boolean;
	width?: number;
	placeholder?: string;
	disabled?: boolean;
	rows?: number;
	nest?: DynamicField;
}

/*
 - type selector
	 - metadata:
		 · target: erm of the entity in singular, i.e.(createdBy, assignee.. have a target: ERM.User.singular)
		 · type: 'entity' | 'const' ->
				 entity: attribute that is an entity (i.e. product.category)
				 const: attribute that is string even though is an entity (product.harbour)
		· multiple: if it can select multiple // Default false
		· canCreate: if it can create an entity // Default false
		· hasBadge: if we display the result with a badge or plain text // Default false
		· width: indicated the width of the selector // Default 390 on dynamic form
		· placeholder: placeholder if we need one different from label/name
*/

export type DynamicFieldType =
	'text' | 'tel' | 'number' | 'decimal' | 'days' | 'textarea' | 'selector' | 'boolean' | 'price' | 'nested'
	| 'priceMatrix' | 'packaging' | 'title' | 'url' | 'email' | 'extendedField' | 'date' | 'status' | 'votes';
