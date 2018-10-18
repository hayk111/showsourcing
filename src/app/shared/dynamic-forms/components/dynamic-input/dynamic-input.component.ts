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
	providers: [makeAccessorProvider(DynamicInputTextComponent)],
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class DynamicInputTextComponent extends AbstractInput implements AfterViewInit {
	@Input() customField: CustomField;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: string;


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
		this.customField.value = this.value;
		this.onChangeFn(this.value);
	}
}
