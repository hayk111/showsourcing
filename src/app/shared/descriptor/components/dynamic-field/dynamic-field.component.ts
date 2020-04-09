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

	onChange(value: string) {
		this.onTouchedFn();
		this.writeValue(value);
		this.onChangeFn(value);
	}

	onTouched() {
		this.onTouchedFn();
	}

}
