import { ID } from '~utils';

import { ExtendedFieldDefinition } from './extended-field-definition.model';

export class SelectorElement {
	id: ID;
	value: string;
	fieldDefinition: ExtendedFieldDefinition;
}
