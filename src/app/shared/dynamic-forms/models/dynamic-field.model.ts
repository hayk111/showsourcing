
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
	nestTarget?: string;
	// only used when using dynamic form from metadata of the extended Fields
	source?: string;
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
		· disabled: if the attribute displayed is disabled
		· rows:number of rows that the element will occupy inside the form e.g. textarea
		· nest: nested property we want to display. Nested values are ALWAYS DISABLED e.g. product.supplier.name
		· nestTarget: target so we know which form control we use e.g. target=supplier
		· source: only used when using dynamic form from metadata of the extended Fields, the source of our selector
*/

export type DynamicFieldType =
	'text' | 'tel' | 'int' | 'decimal' | 'days' | 'textarea' | 'selector' | 'boolean' | 'price' | 'nested'
	| 'priceMatrix' | 'packaging' | 'title' | 'url' | 'email' | 'extendedField' | 'date' | 'status' | 'votes';
