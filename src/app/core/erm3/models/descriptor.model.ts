import { Entity } from './_entity.model';
import { Typename } from '../entity-name.type';

export class Descriptor extends Entity<Descriptor> {
	__typename?: Typename = 'Descriptor';
	id?: string;
	teamId?: string;
	sections?: Array<{
		__typename?: 'SectionDescriptor';
		name?: string;
		fields?: Array<{
			__typename?: 'FieldDescriptor';
			name?: string;
			label?: string;
			type?: string;
			defaultValue?: string | null;
			fixedValue?: boolean | null;
			metadata?: string | null;
		} | null> | null;
	} | null> | null;
	target?: string | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
// TODO Add the audits
