

export class PropertyDefinition {
	label?: string;
	type?: PropertyType;
	name?: string;
}


export enum PropertyType {
	TEXT = 'TEXT',
	TEL = 'TEL',
	EMAIL = 'EMAIL',
	INT = 'INT',
	FLOAT = 'FLOAT',
	TEXTAREA = 'TEXTAREA',
	CHECKBOX = 'CHECKBOX',
	RADIO = 'RADIO',
	PACKAGING = 'PACKAGING',
	PRICE = 'PRICE',
	DATE = 'DATE',
	SELECTOR = 'SELECTOR'
}
