import { ID, uuid } from '~utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';
import { TemplateField } from './template-field.model';

export class RequestTemplate {
	id: ID;
	name: string;
	targetedEntity = 'Product';
	fields: TemplateField[];
	requestedFields: ExtendedFieldDefinition[]; // TODO Backend remove this
	__typename?= 'RequestTemplate';

	constructor(config: RequestTemplateConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface RequestTemplateConfig {
	id?: ID;
	name?: string;
	targetedEntity?: string;
	requestedFields?: ExtendedFieldDefinition[];
}
