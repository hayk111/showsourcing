import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'editable-field-data-management',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableFieldComponent implements OnInit {
	mode: 'edit' | 'closed' = 'closed';

	constructor() { }

	ngOnInit() {
	}

	closeEdit() {
		this.mode = 'closed';
	}

	openEdit() {
		this.mode = 'edit';
	}

}
