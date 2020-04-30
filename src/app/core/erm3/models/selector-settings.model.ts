

export interface SelectorSettings {
	type?: SelectorType;
	multiple?: boolean;
	canCreate?: boolean;
	propertyOptionType?: string;
}

export enum SelectorType {
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	USER = 'USER',
	SAMPLE = 'SAMPLE',
	TASK  = 'TASK',
	CUSTOM = 'CUSTOM'
}
