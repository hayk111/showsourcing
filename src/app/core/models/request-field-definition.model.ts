import { ID, uuid } from '~utils';

export class RequestFieldDefinition {
	id: ID;
	label: string;
	type: string;
	__typename?= 'RequestFieldDefinition';

	constructor(config?: RequestFieldDefinitionConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestFieldDefinitionConfig {
	id?: ID;
	label?: string;
	type?: string;
}
