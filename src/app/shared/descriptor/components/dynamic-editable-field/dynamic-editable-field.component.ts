import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FieldDescriptor } from '~core/erm3/models';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent implements OnInit {
	@Input() field: FieldDescriptor;
	@Output() update = new EventEmitter();
	constructor() { }

	ngOnInit() {
	}

}
