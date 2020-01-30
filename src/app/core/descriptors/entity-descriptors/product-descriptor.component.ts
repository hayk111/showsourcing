import { ERM } from '~core/erm/models';
import { DynamicField } from '~shared/dynamic-forms';

import { AbstractDescriptorComponent } from '../abstract-descriptor.component';

export class ProductDescriptor extends AbstractDescriptorComponent {

	protected _descriptor: DynamicField[] = [
		{ name: 'archived', type: 'boolean' },
		{ name: 'favorite', type: 'boolean' },
		{ name: 'sample', type: 'boolean', label: 'sample-available' },

		{ name: 'masterCbm', type: 'decimal', label: 'master-carton-cbm' },
		{ name: 'quantityPer20ft', type: 'int', label: 'quantity-per-20' },
		{ name: 'quantityPer40ft', type: 'int', label: 'quantity-per-40' },
		{ name: 'quantityPer40ftHC', type: 'int', label: 'quantity-per-40-hc' },
		{ name: 'minimumOrderQuantity', type: 'int', label: 'moq' },

		{ name: 'innerCarton', type: 'packaging', label: 'inner-carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master-carton' },

		{ name: 'price', type: 'price', label: 'price' },
		{ name: 'samplePrice', type: 'price', label: 'sample-price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price-matrix' },

		{ name: 'description', type: 'textarea', metadata: { rows: 5 } },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'reference', type: 'text', label: 'reference' },
		{ name: 'moq', type: 'text', label: 'moq' },
		{ name: 'moqDescription', type: 'textarea', label: 'moq-description' },

		{ name: 'status', type: 'status' },
		{ name: 'votes', type: 'votes' },

		{
			name: 'supplier-name',
			type: 'nested',
			metadata: {
				nestTarget: 'supplier',
				nest: { name: 'name', type: 'text', label: 'supplier-name', metadata: { disabled: true } }
			},
		},
		{
			name: 'supplier-reference',
			type: 'nested',
			metadata: {
				nestTarget: 'supplier',
				nest: { name: 'reference', type: 'text', label: 'supplier-reference', metadata: { disabled: true } }
			},
		},

		{ name: 'extendedFields', type: 'extendedField', label: 'extended fields', metadata: { target: 'Product' } },
		{
			name: 'assignee', type: 'selector',
			label: 'assigned-to',
			metadata: {
				target: ERM.USER.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false,
				placeholder: 'choose assignee'
			}
		},
		{
			name: 'category', type: 'selector',
			label: 'category',
			metadata: {
				target: ERM.CATEGORY.singular,
				canCreate: true,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'event', type: 'selector',
			label: 'event',
			metadata: {
				target: ERM.EVENT.singular,
				canCreate: true,
				multiple: false,
				hasBadge: true
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
			name: 'projects',
			type: 'selector',
			label: 'project',
			metadata: {
				target: ERM.PROJECT.singular,
				canCreate: true,
				multiple: true,
				hasBadge: true
			}
		},
		{
			name: 'supplier', type: 'selector',
			label: 'supplier',
			metadata: {
				target: ERM.SUPPLIER.singular,
				canCreate: true,
				multiple: false,
				hasBadge: true
			}
		},
		{
			name: 'tags',
			type: 'selector',
			label: 'tag',
			metadata: {
				target: ERM.TAG.singular,
				canCreate: true,
				multiple: true,
				hasBadge: true
			}
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
