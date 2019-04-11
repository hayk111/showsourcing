import { uuid } from '~utils';


export class ExtendedFieldDefinition {
	id: string;
	label?: string;
	type?: string;
	order?: number;
	target?: string;
	originId?: string;
	__typename = 'ExtendedFieldDefinition';

	constructor(config?: ExtendedFieldDefinitionConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface ExtendedFieldDefinitionConfig {
	id: string;
}

