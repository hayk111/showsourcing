
const fields1 = [
	{
		definition: {
			label: 'STRING',
			type: 'STRING',
			name: 'string',
		},
		defaultValue: 'test string',
		readonly: false,
		required: true,
		hint: 'This is an helpful message'
	},
	{
		definition: {
			label: 'INT',
			type: 'INT',
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
			type: 'EMAIL',
			name: 'email',
		},
		defaultValue: 'default@gmail.com',
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'tel',
			type: 'TEL',
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
			type: 'FLOAT',
			name: 'float',
		},
		defaultValue: 0,
		readonly: false,
		required: true
	},
];

const fields2 = [
	{
		definition: {
			label: 'checkbox',
			type: 'CHECKBOX',
			name: 'checkbox',
		},
		readonly: false,
	},
	{
		definition: {
			label: 'textarea',
			type: 'TEXTAREA',
			name: 'textarea',
		},
		readonly: false,
		required: true
	},
	{
		definition: {
			label: 'packaging',
			type: 'PACKAGING',
			name: 'packaging',
		},
		required: true,
		readonly: false
	},
	{
		definition: {
			label: 'price',
			type: 'PRICE',
			name: 'price',
		},
		defaultValue: {},
		required: true,
		readonly: false
	}
];

export const sections = [
	{ name: 'Section 1', fields: fields1 },
	{ name: 'Section 2', fields: fields2 }
];

export const descriptorMock = {
	sections: sections
};

