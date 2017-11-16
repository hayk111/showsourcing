import { FormDescriptor } from '../../../../shared/form-builder/interfaces/form-descriptor.interface';

export const FORM_DESCRIPTOR: FormDescriptor = {
	groups: [
		{
			name: 'Company Names',
			fields: [
				{
					name: 'legalName',
					label: 'Legal Name',
					placeholder: 'My Company',
					required: true
				},
				{
					name: 'tradingName',
					label: 'Trading Name',
					placeholder: 'My Comp'
				},
				{
					name: 'brandName',
					label: 'Brand Names',
					placeholder: 'Amazon, Google,..',
				}
			]
		},
		{
			name: 'Company Address',
			fields: [{name: 'address', type: 'address', required: true}]
		},
		{
			name: 'Contact Information',
			fields: [
				{ name: 'website', label: 'Website', type: 'url', placeholder: 'www.mycompany.com'},
				{ name: 'tel', label: 'Phone', type: 'tel', placeholder: '+32 0472 55 45 88', required: true },
				{ name: 'email', label: 'Email', type: 'email', placeholder: 'info@mycompany.com', required: true }
			]
		},
		{
			name: 'Additional Contacts',
			fields: [
				{ name: 'Contact', type: 'contactList' }
			]
		}
	]
};
