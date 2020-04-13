import { Entity } from '~core/erm/models';
import { PropertyDescriptor } from './property-descriptor.model';


export class SectionDescriptor extends Entity<SectionDescriptor> {
	name?: string;
	properties: PropertyDescriptor[];
}
