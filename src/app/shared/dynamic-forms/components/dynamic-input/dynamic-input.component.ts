import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';

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
	providers: [makeAccessorProvider(DynamicInputComponent)]
})
export class DynamicInputComponent extends AbstractInput implements AfterViewInit {
	@Input() customField: CustomField;
	@Output() update = new EventEmitter<DynamicUpdate>();
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngAfterViewInit() {
		this.accumulator = this.value;
	}

	/** saves the value because an user might cancel */
	accumulate(value: any) {
		this.accumulator = value;
	}

	/** when the value changes */
	onChange() {
		this.onChangeFn(this.accumulator);
		this.update.emit({ [this.customField.name]: this.accumulator });
	}

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
