import { Typename } from '../typename.type';
import { Entity } from './_entity.model';
import { Section } from './section.model';


export class Descriptor extends Entity<Descriptor> {
	__typename?: Typename = 'Descriptor';
	id?: string;
	teamId?: string;
	type?: DescriptorType;
	name?: string;
	sections?: Section[];
}


export enum DescriptorType {
	PRODUCT = 'PRODUCT',
	SUPPLIER = 'SUPPLIER',
	SAMPLE = 'SAMPLE',
	TASK = 'TASK',
	SUPPLIER_REQUEST = 'SUPPLIER_REQUEST'
}
