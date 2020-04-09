import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldDescriptor } from '~core/erm3/models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'dynamic-field-app',
	templateUrl: './dynamic-field.component.html',
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicFieldComponent)]
})
export class DynamicFieldComponent extends AbstractInput {

	@Input() field: FieldDescriptor;

	onChange(value: any) {
		if (value !== this.value) {
			this.writeValue(value);
			this.onChangeFn(value);
		}
	}

	onTouched(value: any) {
		this.onTouchedFn();
		this.onChange(value);
	}

}
