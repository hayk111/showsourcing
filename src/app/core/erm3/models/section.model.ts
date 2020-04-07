import { Entity } from '~core/erm/models';
import { FieldDescriptor } from './field-descriptor.model';


export class Section extends Entity<Section> {
	name?: string;
	fields: FieldDescriptor[];
}
