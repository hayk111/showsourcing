import { FieldDescriptor, Section } from '~core/erm3/models';


export interface SectionWithColumns extends Section {
	columns: FieldDescriptor[][];
}
