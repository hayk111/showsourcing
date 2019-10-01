


/** creates a configuration for the dynamic form */
export class DynamicFormConfig {
	/** number of columns displayed */
	colAmount = 1;
	/** whether the values are editable */
	editable = true;
	/** different form styles and functionalities for each modes */
	mode: 'form' | 'editable-text' = 'form';
	/** whether the label is displayed on the same line as the input */
	inlineLabel = true;
	/** when an inline label, sets the alignement of the value */
	alignValue: 'center' | 'right' = 'center';
}

