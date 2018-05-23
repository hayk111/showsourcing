import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from '~models';
import { EditableFieldValue } from '~shared/editable-field/components/editable-field/editable-field-value.interface';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<any>();
	// when select multiple we can create, add and remove
	@Output() itemCreate = new EventEmitter<EditableFieldValue>();
	@Output() itemAdded = new EventEmitter<EditableFieldValue>();
	@Output() itemRemoved = new EventEmitter<EditableFieldValue>();

	descriptor: FormDescriptor;

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', label: 'Name' },
		// { name: 'type', type: 'selector', subtype: 'supplierType', label: 'type' },
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'number', label: 'Lead Time' },
		// { name: 'country', type: 'selector', subtype: 'country', label: 'country' },
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' },
		{ name: 'categories', type: 'selector', metadata: { subtype: 'category' }, label: 'category', multiple: true },
		{ name: 'tags', type: 'selector', metadata: { subtype: 'tag' }, label: 'tags', multiple: true }
	];

	constructor() { }

	ngOnInit() {
		this.descriptor = new FormDescriptor(this.customFields, this.supplier);
	}

	onUpdate(value: any, propName: string) {
		const patch = { [propName]: value };
		this.update.emit(patch);
	}

}
