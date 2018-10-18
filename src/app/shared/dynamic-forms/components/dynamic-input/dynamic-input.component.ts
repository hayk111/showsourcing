import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-input-app',
	templateUrl: './dynamic-input.component.html',
	styleUrls: ['./dynamic-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicInputComponent)],
})
export class DynamicInputComponent extends AbstractInput {
	@Input() customField: CustomField;
	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}


	/** when the value changes */
	onChange() {
		this.customField.value = this.value;
		this.onChangeFn(this.value);
	}

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
