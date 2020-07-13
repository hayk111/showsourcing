// const fields1 = [
// 	{
// 		definition: {
// 			label: 'Name',
// 			type: 'STRING',
// 			name: 'name',
// 		},
// 		defaultValue: 'default name value',
// 		fixedValue: false,
// 		required: false,
// 		hint: 'This is an helpful message',
// 	},
// 	{
// 		definition: {
// 			label: 'Description',
// 			type: 'STRING',
// 			name: 'description',
// 		},
// 		defaultValue: 'default description value',
// 		fixedValue: false,
// 		required: false,
// 		hint: 'This is an helpful message',
// 	},
// 	{
// 		definition: {
// 			label: 'Minimum Order Quantity',
// 			type: 'INT',
// 			name: 'minimumOrderQuantity',
// 		},
// 		defaultValue: 40,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// 	{
// 		definition: {
// 			label: 'MOQ Description',
// 			type: 'STRING',
// 			name: 'moqDescription',
// 		},
// 		defaultValue: 'default MOQ Desc value',
// 		fixedValue: false,
// 		required: false,
// 		hint: 'This is an helpful message',
// 	},
// 	{
// 		definition: {
// 			label: 'Inco Term',
// 			type: 'STRING',
// 			name: 'incoTerm',
// 		},
// 		defaultValue: 'default inco term value',
// 		fixedValue: false,
// 		required: false,
// 		hint: 'This is an helpful message',
// 	},
// 	{
// 		definition: {
// 			label: 'Harbour',
// 			type: 'STRING',
// 			name: 'harbour',
// 		},
// 		defaultValue: 'default harbour value',
// 		fixedValue: false,
// 		required: false,
// 		hint: 'This is an helpful message',
// 	},
// 	{
// 		definition: {
// 			label: 'Master Cbm',
// 			type: 'INT',
// 			name: 'masterCbm',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// ];

// const fields2 = [
// 	{
// 		definition: {
// 			label: 'Quantity per 20ft',
// 			type: 'INT',
// 			name: 'quantityPer20ft',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// 	{
// 		definition: {
// 			label: 'Quantity per 40ft',
// 			type: 'INT',
// 			name: 'quantityPer40ft',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// 	{
// 		definition: {
// 			label: 'Quantity per 40ft HC',
// 			type: 'INT',
// 			name: 'quantityPer40ftHC',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// 	{
// 		definition: {
// 			label: 'Lead Time Value',
// 			type: 'INT',
// 			name: 'leadTimeValue',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// 	{
// 		definition: {
// 			label: 'Lead Time Unit',
// 			type: 'STRING',
// 			name: 'leadTimeUnit',
// 		},
// 		defaultValue: null,
// 		fixedValue: false,
// 		required: false,
// 		hint: '',
// 	},
// ];

// export const sections = [
// 	{ name: 'General', fields: fields1 },
// 	{ name: 'Other', fields: fields2 },
// ];

// export const descriptorMock = {
// 	sections: sections,
// };

import { Descriptor, SectionDescriptor, PropertyDescriptor } from '~core/erm3/models';
import { PropertyType } from '~core/erm3/models/property-definition.model';

const fields: PropertyDescriptor[] = [
	{
		definition: {
			label: 'TEXT',
			type: PropertyType.TEXT,
			name: 'text',
		},
		defaultValue: JSON.stringify('test string'),
		readonly: false,
		required: false,
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
		required: false,
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
		required: false
	},
	{
		definition: {
			label: 'tel',
			type: PropertyType.TEL,
			name: 'tel',
		},
		defaultValue: JSON.stringify('+32'),
		readonly: false,
		required: false,
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
		required: false
	},
	{
		definition: {
			label: 'date',
			type: PropertyType.DATE,
			name: 'date',
		},
		required: false,
		readonly: false
	},
];

export const shippingPackagingDescriptorMock: Descriptor = {
	sections: [{ properties: fields }]
};


