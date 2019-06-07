
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
*/

export type DynamicFieldType =
	'text' | 'tel' | 'number' | 'decimal' | 'days' | 'textarea' | 'selector' | 'boolean' | 'price'
	| 'priceMatrix' | 'packaging' | 'title' | 'url' | 'email' | 'extendedField';
