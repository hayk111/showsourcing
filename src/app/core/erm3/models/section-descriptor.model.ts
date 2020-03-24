import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { FieldDescriptor } from './field-descriptor.model';

export class SectionDescriptor extends Entity<SectionDescriptor> {
	__typename?: Typename = 'SectionDescriptor';
	name?: string;
	fields?: Array<FieldDescriptor | null> | null;
}
