import { ERM } from '~core/models';
import { PickerField } from '~shared/selectors';
import { translate } from '~utils/translate.utils';

export const productFields: PickerField[] = [
	{ name: 'name', type: 'text' },
	{
		name: 'assignee', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.USER.singular,
			placeholder: `${translate('choose')} ${translate('assignee')}`
		}
	},
	{ name: 'description', type: 'text' },
	{
		name: 'category', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.CATEGORY.singular,
			placeholder: `${translate('choose')} ${translate(ERM.CATEGORY.singular, 'erm')}`,
			canCreate: true,
			hasBadge: true
		}
	},
	{
		name: 'supplier', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.SUPPLIER.singular,
			placeholder: `${translate('choose')} ${translate(ERM.SUPPLIER.singular, 'erm')}`,
			canCreate: true,
			hasBadge: true
		}
	},
	{ name: 'price', type: 'price' },
	{
		name: 'event', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.EVENT.singular,
			placeholder: `${translate('choose')} ${translate(ERM.EVENT.singular, 'erm')}`,
			canCreate: true,
			hasBadge: true
		}
	},
	{
		name: 'tags', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.TAG.singular,
			placeholder: `${translate('choose')} ${translate(ERM.TAG.plural, 'erm')}`,
			multiple: true,
			canCreate: true,
			hasBadge: true
		}
	},
	// { name: 'favorite', type: 'boolean' },
	{ name: 'extendedFields', label: 'extended fields', type: 'extendedField' },
	{ name: 'innerCarton', label: translate('inner carton'), type: 'packaging' },
	{ name: 'masterCarton', label: translate('master carton'), type: 'packaging' },
	{ name: 'minimumOrderQuantity', label: translate('MOQ'), type: 'number' },
	{ name: 'moqDescription', label: translate('MOQ description'), type: 'text' },
	{ name: 'votes', type: 'votes' },
	// { name: 'sample', type: 'boolean' },
	{ name: 'samplePrice', label: 'sample price', type: 'price' },
	{
		name: 'projects', type: 'selector',
		metadata: {
			width: 500,
			target: ERM.PROJECT.singular,
			placeholder: `${translate('choose')} ${translate(ERM.PROJECT.plural, 'erm')}`,
			multiple: true,
			canCreate: true,
			hasBadge: true
		}
	},
	{ name: 'masterCbm', type: 'decimal', label: 'Master Carton CBM' },
	{ name: 'quantityPer20ft', type: 'number', label: `Quantity per 20'` },
	{ name: 'quantityPer40ft', type: 'number', label: `Quantity per 40'` },
	{ name: 'quantityPer40ftHC', type: 'number', label: `Quantity per 40' HC` },
	{
		name: 'incoTerm', type: 'selector', label: translate(ERM.INCO_TERM.singular, 'erm'),
		metadata: {
			target: ERM.INCO_TERM.singular,
			canCreate: false,
			multiple: false,
		}
	},
	{
		name: 'harbour', type: 'selector', label: translate(ERM.HARBOUR.singular, 'erm'),
		metadata: {
			target: ERM.HARBOUR.singular,
			canCreate: false,
			multiple: false,
			width: 495
		}
	},
	{ name: 'status', type: 'status' },
];
