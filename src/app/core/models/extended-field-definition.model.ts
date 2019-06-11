import { ID, uuid } from '~utils';

export interface ExtendedFieldDefinitionMetadata {
	type?: string;
	source?: string;
	canCreate?: boolean;
}

export class ExtendedFieldDefinition {
	id: ID;
	label?: string;
	type?: string;
	order?: number;
	target?: string;
	originId?: string;
	metadata?: string;

	__typename?= 'ExtendedFieldDefinition';

	constructor(config?: ExtendedFieldDefinitionConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface ExtendedFieldDefinitionConfig {
	id: ID;
	label?: string;
	type?: string;
	order?: number;
	target?: string;
	originId?: string;
	metadata?: string;
}

