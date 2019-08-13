import { AbstractDescriptorComponent } from './abstract-descriptor.component';
import { ERM } from '~core/models';
import { translate } from '~utils';
import { DynamicField } from '~shared/dynamic-forms';

export class SupplierDescriptor extends AbstractDescriptorComponent {

	// TODO i18n
	// TODO ERM ENUM
	protected _descriptor: DynamicField[] = [
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'days', label: 'Lead Time' },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' },

		{
			name: 'country', type: 'selector',
			label: 'country',
			metadata: {
				target: ERM.COUNTRY.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'harbour', type: 'selector',
			metadata: {
				target: ERM.HARBOUR.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'incoTerm', type: 'selector',
			metadata: {
				target: ERM.INCO_TERM.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: ERM.SUPPLIER_TYPE.singular, type: 'selector',
			label: 'type',
			metadata: {
				target: ERM.SUPPLIER_TYPE.singular,
				canCreate: true,
				multiple: false,
				hasBadge: false
			},
		},
		{
			name: 'createdBy',
			type: 'selector',
			label: translate('created by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'creationDate',
			type: 'date',
			label: translate('creation date'),
			metadata: { disabled: true }
		},
		{
			name: 'lastUpdatedBy',
			type: 'selector',
			label: translate('last updated by'),
			metadata: { target: ERM.USER.singular, type: 'entity', disabled: true }
		},
		{
			name: 'lastUpdatedDate',
			type: 'date',
			label: translate('last updated date'),
			metadata: { disabled: true }
		}
	];

	constructor(only?: string[]) {
		super();
		this.getOnly(only);
	}
}
