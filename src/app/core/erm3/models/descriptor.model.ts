import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { FieldDescriptor } from './field-descriptor.model';

export class Descriptor extends Entity<Descriptor> {
	__typename?: Typename = 'Descriptor';
	id?: string;
	teamId?: string;
	sections?: Array<FieldDescriptor | null> | null;
	target?: string | null;
}
