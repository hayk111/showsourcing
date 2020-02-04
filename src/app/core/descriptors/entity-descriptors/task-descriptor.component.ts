import { ERM } from '~core/erm';
import { DynamicField } from '~shared/dynamic-forms';

import { AbstractDescriptorComponent } from '../abstract-descriptor.component';

export class TaskDescriptor extends AbstractDescriptorComponent {

	protected _descriptor: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'description', type: 'textarea', label: 'description', metadata: { rows: 5 } },
		{ name: 'dueDate', type: 'date', label: 'due-date' },

		{
			name: 'assignee', type: 'selector',
			label: 'assigned-to',
			metadata: {
				target: ERM.USER.singular,
				canCreate: false,
				multiple: false,
				hasBadge: false,
			}
		},
		{
			name: 'product', type: 'selector',
			label: ERM.PRODUCT.singular,
			metadata: {
				target: ERM.PRODUCT.singular,
				canCreate: true,
				multiple: false,
				hasBadge: true,
			}
		},
		{
			name: 'supplier',
			type: 'selector',
			label: ERM.SUPPLIER.singular,
			metadata: {
				target: ERM.SUPPLIER.singular,
				canCreate: true,
				multiple: false,
				hasBadge: true,
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
