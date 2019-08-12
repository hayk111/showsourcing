import { ERM } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { translate } from '~utils';
import { AbstractDescriptorComponent } from './abstract-descriptor.component';

export class ProductDescriptorComponent extends AbstractDescriptorComponent {

	// TODO i18n
	descriptor: DynamicField[] = [
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

		{ name: 'description', type: 'text' },
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{ name: 'moqDescription', type: 'textarea', label: translate('MOQ description') },

		{ name: 'status', type: 'status' },
		{ name: 'votes', type: 'votes' },

		{ name: 'extendedFields', type: 'extendedField', label: 'extended fields', metadata: { target: 'Product' } },

		{
			name: 'assignee', type: 'selector',
			metadata: {
				width: 500,
				target: ERM.USER.singular,
				placeholder: `${translate('choose')} ${translate('assignee')}`
			}
		},
		{
			name: 'category', type: 'selector',
			label: translate(ERM.CATEGORY.singular, 'erm'),
			metadata: {
				target: ERM.CATEGORY.singular,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'event', type: 'selector',
			label: translate(ERM.EVENT.singular, 'erm'),
			metadata: {
				target: ERM.EVENT.singular,
				type: 'entity',
				labelName: 'name',
				canCreate: true,
				hideLogo: true
			}
		},
		{
			name: 'harbour', type: 'selector',
			label: translate(ERM.HARBOUR.singular, 'erm'),
			metadata: {
				target: ERM.HARBOUR.singular,
				canCreate: false,
				multiple: false,
				width: 495
			}
		},
		{
			name: 'incoTerm', type: 'selector',
			label: translate(ERM.INCO_TERM.singular, 'erm'),
			metadata: {
				target: ERM.INCO_TERM.singular,
				canCreate: false,
				multiple: false,
				width: 495
			}
		},
		{
			name: 'projects',
			type: 'selector',
			label: translate(ERM.PROJECT.plural, 'erm'),
			metadata: {
				target: ERM.PROJECT.singular,
				multiple: true,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'supplier', type: 'selector',
			label: translate(ERM.SUPPLIER.singular, 'erm'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'tags',
			type: 'selector',
			label: translate(ERM.TAG.plural, 'erm'),
			metadata: {
				target: ERM.TAG.singular,
				multiple: true,
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		}
	];

	constructor() {
		super();
	}

}
