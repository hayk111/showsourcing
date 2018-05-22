import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'custom-editable-field-app',
	templateUrl: './custom-editable-field.component.html',
	styleUrls: ['./custom-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomEditableFieldComponent implements OnInit {
	// whether we can edit this field or not
	@Input() editable = true;
	@Input() value = '';
	@Input() type = 'text';
	@Input() label: string = '';
	@Input() multiple = true;

	constructor() { }

	ngOnInit() {
	}

	onSave() {

	}

	closeEditMode() {

	}
}
