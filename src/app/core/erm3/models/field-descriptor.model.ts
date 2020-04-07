import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { FieldDefinition } from './field-definition.model';

export class FieldDescriptor extends Entity<FieldDescriptor> {
	__typename?: Typename = 'FieldDescriptor';
	defaultValue: string;
	fixedValue: boolean;
	required: boolean;
	definition: FieldDefinition;
}


