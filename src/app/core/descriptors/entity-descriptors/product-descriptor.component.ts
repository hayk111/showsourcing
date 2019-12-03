import { ERM } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { translate } from '~utils';
import { AbstractDescriptorComponent } from '../abstract-descriptor.component';

export class ProductDescriptor extends AbstractDescriptorComponent {

	// TODO i18n
	protected _descriptor: DynamicField[] = [
		{ name: 'archived', type: 'boolean' },
		{ name: 'favorite', type: 'boolean' },
		{ name: 'sample', type: 'boolean', label: translate('sample available') },

		{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
		{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
		{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
		{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
		{ name: 'minimumOrderQuantity', type: 'number', label: translate('MOQ') },

		{ name: 'innerCarton', type: 'packaging', label: translate('inner carton') },
		{ name: 'masterCarton', type: 'packaging', label: translate('master carton') },

		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{ name: 'samplePrice', type: 'price', label: translate('sample price') },
		{ name: 'priceMatrix', type: 'priceMatrix', label: translate('price matrix') },

		{ name: 'description', type: 'textarea', metadata: { rows: 5 } },
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{ name: 'reference', type: 'text', label: translate('reference') },
		{ name: 'moq', type: 'text', label: translate('moq') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },

		{ name: 'status', type: 'status' },
		{ name: 'votes', type: 'votes' },

		{ name: 'extendedFields', type: 'extendedField', label: 'extended fields', metadata: { target: 'Product' } },
		{
			name: 'assignee', type: 'selector',
			label: translate('assigned to'),
			metadata: {
				target: ERM.USER.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false,
				placeholder: `${translate('choose')} ${translate('assignee')}`
			}
		},
		{
			name: 'category', type: 'selector',
			label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: {
				target: ERM.CATEGORY.singular,
				canCreate: true,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'event', type: 'selector',
			label: translate(ERM.EVENT.singular, 'erm'),
			metadata: {
				target: ERM.EVENT.singular,
				canCreate: true,
				multiple: false,
				hasBadge: true
			}
		},
		{
			name: 'harbour', type: 'selector',
			label: translate(ERM.HARBOUR.singular, 'erm'),
			metadata: {
				target: ERM.HARBOUR.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'incoTerm', type: 'selector',
			label: translate(ERM.INCO_TERM.singular, 'erm'),
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
			label: translate(ERM.PROJECT.plural, 'erm'),
			metadata: {
				target: ERM.PROJECT.singular,
				canCreate: true,
				multiple: true,
				hasBadge: true
			}
		},
		{
			name: 'supplier', type: 'selector',
			label: translate(ERM.SUPPLIER.singular, 'erm'),
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
			label: translate(ERM.TAG.plural, 'erm'),
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
			label: translate('created by'),
			metadata: { target: ERM.USER.singular, disabled: true }
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
			metadata: { target: ERM.USER.singular, disabled: true }
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
		this.pickFields(only);
	}

}
