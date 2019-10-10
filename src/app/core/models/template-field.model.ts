import { ID } from '~utils';
import { uuid } from '~utils/uuid.utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';


export class TemplateField {
	id: ID;
	defaultValue: string;
	definition: ExtendedFieldDefinition;
	fixedValue: boolean;
	__typename?= 'TemplateField';

	constructor(config?: TemplateField) {
		Object.assign(this, config);
		this.id = uuid();
	}
}

export interface TemplateFieldConfig {
	id?: ID;
	defaultValue?: string;
	definition?: ExtendedFieldDefinition;
	fixedValue?: boolean;
}
