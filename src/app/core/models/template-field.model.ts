import { ID } from '~utils';
import { uuid } from '~utils/uuid.utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';


export class TemplateField {
	id: ID;
	defaultValue: string;
	definition: ExtendedFieldDefinition;
	fixedValue: boolean;
	__typename?= 'TemplateField';
	/** temp so we can set if it's one from the db or not */
	inTemplate?: boolean;

	constructor(config?: TemplateFieldConfig) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface TemplateFieldConfig {
	id?: ID;
	defaultValue?: string;
	definition?: ExtendedFieldDefinition;
	fixedValue?: boolean;
	inTemplate?: boolean;
}
