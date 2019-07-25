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
	{ name: 'innerCarton', label: 'inner carton', type: 'packaging' },
	{ name: 'masterCarton', label: 'master carton', type: 'packaging' },
	// { name: 'leadTime', label: 'lead time', type: 'number' },
	// { name: 'leadTimeUnit', label: 'lead time unit', type: 'text' },
	{ name: 'minimumOrderQuantity', label: 'moq', type: 'number' },
	{ name: 'moqDescription', label: 'moq description', type: 'text' },
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
	{ name: 'status', type: 'status' },
];
