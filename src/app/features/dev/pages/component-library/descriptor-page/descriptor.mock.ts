
const fields1 = [
	{
		definition: {
			label: 'STRING',
			type: 'STRING',
			name: 'string',
		},
		defaultValue: undefined,
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
		readonly: false,
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
		readonly: false,
		required: false
	},
];

const fields2 = [
	{
		definition: {
			label: 'color',
			type: 'STRING',
			name: 'color',
		}
	},
	// {
	// 	definition: {
	// 		label: 'boolean',
	// 		type: 'BOOLEAN',
	// 		name: 'boolean',
	// 	}
	// },
	{
		definition: {
			label: 'quantity',
			type: 'INT',
			name: 'quantity',
		}
	}
];

export const sections = [
	{ name: 'Section 1', fields: fields1 },
	{ name: 'Section 2', fields: fields2 }
];

export const descriptorMock = {
	sections: sections
};

