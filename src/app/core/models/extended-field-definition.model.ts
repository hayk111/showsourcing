

export class ExtendedFieldDefinition {
	id: string;
	label?: string;
	type?: string;
	order?: number;
	__typename = 'ExtendedFieldDefinition';

	constructor(config: ExtendedFieldDefinitionConfig) {
		Object.assign(this, config);
	}
}

export interface ExtendedFieldDefinitionConfig {
	id: string;
}

