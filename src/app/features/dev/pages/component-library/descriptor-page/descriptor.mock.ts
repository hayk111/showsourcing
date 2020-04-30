import { Descriptor, SectionDescriptor, PropertyDescriptor, SelectorType } from '~core/erm3/models';
import { PropertyType } from '~core/erm3/models/property-definition.model';

const fields1: PropertyDescriptor[] = [
	{
		definition: {
			label: 'TEXT',
			type: PropertyType.TEXT,
			name: 'text',
		},
		defaultValue: JSON.stringify('test string'),
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
		defaultValue: JSON.stringify(40),
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
		defaultValue: JSON.stringify('default@gmail.com'),
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'tel',
			type: PropertyType.TEL,
			name: 'tel',
		},
		defaultValue: JSON.stringify('+32'),
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
		defaultValue: JSON.stringify(0),
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
	},
	{
		definition: {
			label: 'color',
			type: PropertyType.COLOR,
			name: 'color',
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
		required: true,
		readonly: false
	},
	{
		definition: {
			label: 'price matrix',
			type: PropertyType.PRICE_MATRIX,
			name: 'price_matrix',
		},
		required: true,
		readonly: false
	},
	{
		definition: {
			label: 'selector',
			type: PropertyType.SELECTOR,
			name: 'selector',
			selectorSettings: {
				type: SelectorType.CUSTOM,
				propertyOptionType: 'color'
			}
		},
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

