import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { EditableFieldComponent } from '~app/shared/editable-field';
import { EditableTextComponent } from '~app/shared/editable-field/components/editable-text/editable-text.component';
import { Patch } from '~app/entity';

@Component({
	selector: 'supplier-description-app',
	templateUrl: './supplier-description.component.html',
	styleUrls: ['./supplier-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDescriptionComponent {
	@Input() supplier;
	@ViewChild('editable') editable: EditableTextComponent;
	@Output() update = new EventEmitter<Patch>();
	constructor() { }

	edit() {
		this.editable.open();
	}

	onSave(value: string) {
		this.update.emit({ id: this.supplier.id, value, propName: 'description' });
		this.editable.close();
	}

}
