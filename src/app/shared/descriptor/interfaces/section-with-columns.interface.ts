import { PropertyDescriptor, SectionDescriptor } from '~core/erm3/models';


export interface SectionWithColumns extends SectionDescriptor {
	columns: PropertyDescriptor[][];
}
