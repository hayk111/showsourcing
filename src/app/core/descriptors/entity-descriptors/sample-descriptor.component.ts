import { AbstractDescriptorComponent } from '../abstract-descriptor.component';
import { translate } from '~utils';
import { ERM } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';

export class SampleDescriptor extends AbstractDescriptorComponent {

	protected _descriptor: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name') },
		{ name: 'description', type: 'textarea', label: translate('Description'), metadata: { rows: 5 } },
		{ name: 'price', type: 'price', label: translate(ERM.PRICE.singular, 'erm') },
		{ name: 'paid', type: 'boolean', label: translate('paid') },

		{
			name: 'assignee', type: 'selector',
			label: translate('assigned to'),
			metadata: {
				target: ERM.USER.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false
			}
		},
		{
			name: 'product', type: 'selector',
			label: translate(ERM.PRODUCT.singular, 'erm'),
			metadata: {
				target: ERM.PRODUCT.singular,
				canCreate: true,
				multiple: false,
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
			name: 'createdBy', type: 'selector',
			label: translate('created by'),
			metadata: {
				target: ERM.USER.singular,
				disabled: true
			}
		}
	];

	constructor(only?: string[]) {
		super();
		this.getOnly(only);
	}
}
