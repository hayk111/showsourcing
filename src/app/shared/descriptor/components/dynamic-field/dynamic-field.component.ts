import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldDescriptor } from '~core/erm3/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'dynamic-field-app',
	templateUrl: './dynamic-field.component.html',
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFieldComponent {

	@Input() field: FieldDescriptor;
	@Input() control: FormControl;

}
