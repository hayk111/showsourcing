import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class FieldDescriptor extends Entity<FieldDescriptor> {
	__typename?: Typename = 'FieldDescriptor';
	name?: string;
	label?: string;
	type?: string;
	defaultValue?: string | null;
	fixedValue?: boolean | null;
	metadata?: string | null;
}
