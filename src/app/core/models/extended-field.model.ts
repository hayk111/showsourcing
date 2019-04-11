import { ID } from '~utils';
import { uuid } from '~utils/uuid.utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';



export class ExtendedField {
	id: string;
	definition?: ExtendedFieldDefinition;
	value?: string;
	__typename?= 'ExtendedField';

	constructor(config?: ExtendedFieldConfig) {
		if (!config || !config.id) this.id = uuid();
		Object.assign(this, config);
	}
}

export interface ExtendedFieldConfig {
	id?: ID;
	definition?: ExtendedFieldDefinition;
	value?: string;
}
