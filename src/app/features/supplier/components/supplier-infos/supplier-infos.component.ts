import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patch, Supplier, Tag } from '~entity';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';
import { EditableFieldValue } from '~app/shared/editable-field/components/editable-field/editable-field-value.interface';
import { productActions } from '~product';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Patch>();
	// when select multiple we can create, add and remove
	@Output() itemCreate = new EventEmitter<EditableFieldValue>();
	@Output() itemAdded = new EventEmitter<EditableFieldValue>();
	@Output() itemRemoved = new EventEmitter<EditableFieldValue>();

	constructor() { }

	ngOnInit() { }

	onUpdate(value: any, propName: string) {
		const patch: Patch = { propName, value, id: this.supplier.id };
		this.update.emit(patch);
	}


}
