import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ERM, Supplier } from '~models';
import { DynamicField } from '~shared/dynamic-forms';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent extends AutoUnsub {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Supplier>();
	textMode = true;
	form: FormGroup;
	erm = ERM;

	customFields: DynamicField[] = [
		{ name: 'name', type: 'text', label: 'Name' },
		{
			name: 'supplier type',
			type: 'selector',
			metadata: { target: 'supplier type', type: 'entity', canCreate: false, labelName: 'name' },
			label: 'type'
		},
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'days', label: 'Lead Time' },
		{ name: 'country', type: 'selector', metadata: { target: 'country', type: 'const' }, label: 'country' },
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'harbour', type: 'selector', metadata: { target: 'harbour', type: 'const' } },
		{ name: 'incoterm', type: 'selector', metadata: { target: 'incoterm', type: 'const' } },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' },
		{
			name: 'categories', type: 'selector', metadata: {
				target: 'category', type: 'entity', canCreate: true
			}, label: 'categories', multiple: true
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', canCreate: true }, label: 'tags', multiple: true }
	];

	constructor() {
		super();
	}

	toggle() {
		this.textMode = !this.textMode;
	}
}
