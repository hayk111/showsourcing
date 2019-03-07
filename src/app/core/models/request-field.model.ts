import { ID, uuid } from '~utils';
import { RequestFieldDefinition } from './request-field-definition.model';

export class RequestField {
	id: ID;
	definition?: RequestFieldDefinition;
	value?: string;
	__typename?= 'RequestField';

	constructor(config?: RequestFieldConfig) {
		if (!config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface RequestFieldConfig {
	id?: ID;
	value?: string;
}
