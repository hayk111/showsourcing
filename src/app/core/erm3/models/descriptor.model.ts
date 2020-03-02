import { Entity } from './_entity.model';

export class Descriptor extends Entity<Descriptor> {

	id?: string;
	teamId?: string;

	__typename?: 'Descriptor';
	sections?: Array<{
		__typename: 'SectionDescriptor';
		name: string;
		fields: Array<{
			__typename: 'FieldDescriptor';
			name: string;
			label: string;
			type: string;
			defaultValue: string | null;
			fixedValue: boolean | null;
			metadata: string | null;
		} | null> | null;
	} | null> | null;
	target?: string | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}

// export type CreateDescriptorInput = {
//   id?: string | null;
//   teamId: string;
//   sections?: Array<SectionDescriptorInput | null> | null;
//   target?: string | null;
//   _version?: number | null;
// };
