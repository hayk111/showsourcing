import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from '~models';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent extends AutoUnsub implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Supplier>();

	descriptor: FormDescriptor;

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', label: 'Name' },
		{
			name: 'supplierType',
			type: 'selector',
			metadata: { target: 'supplierType', type: 'entity', canCreate: true, labelName: 'name' },
			label: 'type'
		},
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'days', label: 'Lead Time' },
		{ name: 'country', type: 'selector', metadata: { target: 'country', type: 'const' }, label: 'country' },
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'harbour', type: 'selector', metadata: { target: 'harbour', type: 'const' } },
		{ name: 'incoTerm', type: 'selector', metadata: { target: 'incoTerm', type: 'const' } },
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

	ngOnInit() {
		this.descriptor = new FormDescriptor(this.customFields, this.supplier);
	}

	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(supplier => this.update.emit({ id: this.supplier.id, ...supplier }));
	}

}
