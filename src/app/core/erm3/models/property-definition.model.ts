import { SelectorSettings } from './selector-settings.model';


export class PropertyDefinition {
	label?: string;
	type?: PropertyType;
	name?: string;
	selectorSettings?: SelectorSettings;
}


export enum PropertyType {
	TEXT = 'TEXT',
	TEL = 'TEL',
	EMAIL = 'EMAIL',
	COLOR = 'COLOR',
	INT = 'INT',
	FLOAT = 'FLOAT',
	TEXTAREA = 'TEXTAREA',
	CHECKBOX = 'CHECKBOX',
	RADIO = 'RADIO',
	PACKAGING = 'PACKAGING',
	PRICE = 'PRICE',
	PRICE_MATRIX = 'PRICE_MATRIX',
	DATE = 'DATE',
	SELECTOR = 'SELECTOR'
}
