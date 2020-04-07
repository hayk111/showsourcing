
const fields1 = [
	{
		definition: {
			label: 'STRING',
			type: 'STRING',
			name: 'string',
		},
		defaultValue: 'string default value',
		fixedValue: false,
		required: true
	},
	{
		definition: {
			label: 'INT',
			type: 'INT',
			name: 'int',
		},
		defaultValue: 40,
		fixedValue: false,
		required: true,
	},
	{
		definition: {
			label: 'email',
			type: 'EMAIL',
			name: 'email',
		},
		defaultValue: 'default@gmail.com',
		fixedValue: false,
		required: true
	},
	{
		definition: {
			label: 'tel',
			type: 'TEL',
			name: 'tel',
		},
		defaultValue: '+32',
		fixedValue: false,
		required: true
	},
	{
		definition: {
			label: 'float',
			type: 'FLOAT',
			name: 'float',
		},
		defaultValue: 0,
		fixedValue: false,
		required: true
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

