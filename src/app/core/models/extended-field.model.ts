import { ID } from '~utils';
import { uuid } from '~utils/uuid.utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';



export class ExtendedField {
	id: string;
	definition?: ExtendedFieldDefinition;
	value?: string;
	__typename ?= 'ExtendedField';

	constructor(config?: ExtendedFieldConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface ExtendedFieldConfig {
	id?: ID;
	definition?: ExtendedFieldDefinition;
	value?: string;
}
