import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityRepresentation } from '~store/utils/entities.utils';

@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
})
export class EditableFieldComponent implements OnInit {
	@Input() value;
	@Input() type = 'text';
	@Input() entityRep: EntityRepresentation;
	@Input() label: string;
	@Output() update = new EventEmitter<any>();

	editMode = false;

	constructor() {}

	ngOnInit() {}

	openEditMode() {
		this.editMode = true;
	}

	closeEditMode() {
		// so the blur event of the input fires
		// without this, the inputs isn't shown and the blur doesn't fire
		setTimeout(() => (this.editMode = false), 0);
	}
}
