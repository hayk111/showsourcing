import { ExtendedFieldDefinition } from './extended-field-definition.model';
import { uuid } from '~utils/uuid.utils';



export class ExtendedField {
	id: string;
	definition?: ExtendedFieldDefinition;
	value?: string;
	__typename?= 'ExtendedField';

	constructor() {
		this.id = uuid();
	}
}
