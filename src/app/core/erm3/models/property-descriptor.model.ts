import { PropertyDefinition } from './property-definition.model';
import { Entity } from './_entity.model';

export class PropertyDescriptor extends Entity<PropertyDescriptor> {
	defaultValue?: any;
	readonly?: boolean;
	required?: boolean;
	definition: PropertyDefinition;
	hint?: string;
}


