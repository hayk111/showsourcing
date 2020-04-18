import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyDescriptor, PropertyType } from '~core/erm3';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent implements OnInit {
	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;
	@Output() update = new EventEmitter<any>();
	type = PropertyType;
	initialValue;

	ngOnInit() {
		this.initialValue = this.control.value;
	}

	onSave() {
		this.initialValue = this.control.value;
	}

	reset() {
		this.control.reset(this.initialValue);
	}

	toggleValue() {
		if (!this.descriptor.readonly) {
			this.control.setValue(!this.control.value);
		}
	}
}
