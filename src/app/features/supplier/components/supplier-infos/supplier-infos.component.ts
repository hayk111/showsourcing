import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from '~models';
import { EditableFieldValue } from '~shared/editable-field/components/editable-field/editable-field-value.interface';

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

	constructor() { }

	ngOnInit() { }

	onUpdate(value: any, propName: string) {
		const patch = { [propName]: value };
		this.update.emit(patch);
	}


}
