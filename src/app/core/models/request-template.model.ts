import { ID, uuid } from '~utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';

export class RequestTemplate {
	id: ID;
	name: string;
	targetedEntity: string;
	requestedFields: ExtendedFieldDefinition[];
	__typename?= 'RequestTemplate';

	constructor(config: RequestTemplateConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestTemplateConfig {
	id?: ID;
	name?: string;
	targetedEntity?: string;
}
