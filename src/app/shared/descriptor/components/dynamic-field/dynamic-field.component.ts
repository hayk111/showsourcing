import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PropertyDescriptor } from '~core/erm3/models';
import { PropertyType } from '~core/erm3/models/property-definition.model';

@Component({
	selector: 'dynamic-field-app',
	templateUrl: './dynamic-field.component.html',
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldComponent {

	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;
	type = PropertyType;
}
