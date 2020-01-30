import { ID, uuid } from '~utils';

import { TemplateField } from './template-field.model';

export class RequestTemplate {
	id: ID;
	name?: string;
	targetedEntity?= 'Product';
	fields?: TemplateField[];

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
	fields?: TemplateField[];
}
