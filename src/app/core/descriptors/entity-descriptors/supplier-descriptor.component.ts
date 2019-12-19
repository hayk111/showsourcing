import { AbstractDescriptorComponent } from '../abstract-descriptor.component';
import { ERM } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';

export class SupplierDescriptor extends AbstractDescriptorComponent {

	protected _descriptor: DynamicField[] = [
		{ name: 'address', type: 'textarea', label: 'address' },
		{ name: 'description', type: 'textarea', metadata: { rows: 5 } },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'fullName', type: 'text', label: 'legal-name' },
		{ name: 'reference', type: 'text', label: 'reference' },
		{ name: 'generalMOQ', type: 'int', label: 'moq' },
		{ name: 'generalLeadTime', type: 'days', label: 'general-lead-time' },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'phone' },

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
			label: 'harbour',
			metadata: {
				target: ERM.HARBOUR.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'incoTerm', type: 'selector',
			label: 'inco-term',
			metadata: {
				target: ERM.INCO_TERM.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'supplierType', type: 'selector',
			label: 'supplier-type',
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
			label: 'created-by',
			metadata: { target: ERM.USER.singular, disabled: true }
		},
		{
			name: 'creationDate',
			type: 'date',
			label: 'creation-date',
			metadata: { disabled: true }
		},
		{
			name: 'lastUpdatedBy',
			type: 'selector',
			label: 'last-updated-by',
			metadata: { target: ERM.USER.singular, disabled: true }
		},
		{
			name: 'lastUpdatedDate',
			type: 'date',
			label: 'last-updated-date',
			metadata: { disabled: true }
		}
	];

	constructor(only?: string[]) {
		super();
		this.pickFields(only);
	}
}
