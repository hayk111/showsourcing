import { Descriptor, SectionDescriptor, PropertyDescriptor } from '~core/erm3/models';
import { PropertyType } from '~core/erm3/models/property-definition.model';

const fields1: PropertyDescriptor[] = [
	{
		definition: {
			label: 'TEXT',
			type: PropertyType.TEXT,
			name: 'text',
		},
		defaultValue: 'test string',
		readonly: false,
		required: true,
		hint: 'This is an helpful message'
	},
	{
		definition: {
			label: 'INT',
			type: PropertyType.INT,
			name: 'int',
		},
		defaultValue: 40,
		readonly: false,
		required: true,
		hint: 'Field expressed in Kg'
	},
	{
		definition: {
			label: 'email',
			type: PropertyType.EMAIL,
			name: 'email',
		},
		defaultValue: 'default@gmail.com',
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'tel',
			type: PropertyType.TEL,
			name: 'tel',
		},
		defaultValue: '+32',
		readonly: false,
		required: true,
		hint: '+44 444 444 44'
	},
	{
		definition: {
			label: 'float',
			type: PropertyType.FLOAT,
			name: 'float',
		},
		defaultValue: 0,
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'date',
			type: PropertyType.DATE,
			name: 'date',
		},
		required: true,
		readonly: false
	}
];

const fields2: PropertyDescriptor[] = [
	{
		definition: {
			label: 'checkbox',
			type: PropertyType.CHECKBOX,
			name: 'checkbox',
		},
		readonly: false,
	},
	{
		definition: {
			label: 'textarea',
			type: PropertyType.TEXTAREA,
			name: 'textarea',
		},
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'packaging',
			type: PropertyType.PACKAGING,
			name: 'packaging',
		},
		required: true,
		readonly: false
	},
	{
		definition: {
			label: 'price',
			type: PropertyType.PRICE,
			name: 'price',
		},
		defaultValue: {},
		required: true,
		readonly: false
	}
];

export const sections: SectionDescriptor[] = [
	{ name: 'Section 1', properties: fields1 },
	{ name: 'Section 2', properties: fields2 }
];

export const descriptorMock: Descriptor = {
	sections: sections
};

