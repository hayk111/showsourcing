import { ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyDescriptor, PropertyType } from '~core/erm3';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent {
	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;
	type = PropertyType;
}
