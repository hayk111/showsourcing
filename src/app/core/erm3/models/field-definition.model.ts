

export class FieldDefinition {
	label: string;
	type: FieldType;
	name: string;
}


export enum FieldType {
	INT = 'INT',
	FLOAT = 'FLOAT',
	STRING = 'STRING',
	PRICE = 'PRICE',
	DATE = 'DATE',
	SELECTOR = 'SELECTOR'
}
