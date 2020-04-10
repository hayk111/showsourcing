
const fields1 = [
	{
		definition: {
			label: 'STRING',
			type: 'STRING',
			name: 'string',
		},
		defaultValue: 'test string',
		readonly: true,
		required: false,
		hint: 'This is an helpful message'
	},
	{
		definition: {
			label: 'INT',
			type: 'INT',
			name: 'int',
		},
		defaultValue: 40,
		readonly: true,
		required: false,
		hint: 'Field expressed in Kg'
	},
	{
		definition: {
			label: 'email',
			type: 'EMAIL',
			name: 'email',
		},
		defaultValue: 'default@gmail.com',
		readonly: true,
		required: false
	},
	{
		definition: {
			label: 'tel',
			type: 'TEL',
			name: 'tel',
		},
		defaultValue: '+32',
		readonly: true,
		required: false,
		hint: '+44 444 444 44'
	},
	{
		definition: {
			label: 'float',
			type: 'FLOAT',
			name: 'float',
		},
		defaultValue: 0,
		readonly: true,
		required: false
	},
];

const fields2 = [
	{
		definition: {
			label: 'checkbox',
			type: 'CHECKBOX',
			name: 'checkbox',
		},
		readonly: true,
	},
	{
		definition: {
			label: 'textarea',
			type: 'TEXTAREA',
			name: 'textarea',
		},
		readonly: true
	},
	{
		definition: {
			label: 'packaging',
			type: 'PACKAGING',
			name: 'packaging',
		},
		required: false,
		readonly: true
	},
	{
		definition: {
			label: 'price',
			type: 'PRICE',
			name: 'price',
		},
		required: false,
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

