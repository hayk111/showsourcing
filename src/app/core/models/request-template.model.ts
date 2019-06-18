import { ID, uuid } from '~utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';

export class RequestTemplate {
	id: ID;
	name: string;
	targetedEntity = 'Product';
	requestedFields: ExtendedFieldDefinition[];
	__typename?= 'RequestTemplate';

	constructor(config: RequestTemplateConfig) {
		Object.assign(this, config);
		if (!config.id) this.id = uuid();
	}
}

export interface RequestTemplateConfig {
	id?: ID;
	name?: string;
	targetedEntity?: string;
	requestedFields?: ExtendedFieldDefinition[];
}
