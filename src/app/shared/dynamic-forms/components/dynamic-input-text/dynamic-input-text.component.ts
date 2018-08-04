import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-input-text-app',
	templateUrl: './dynamic-input-text.component.html',
	styleUrls: ['./dynamic-input-text.component.scss', './common-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicInputTextComponent)],
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class DynamicInputTextComponent extends AbstractInput implements OnInit {
	@Input() customField: CustomField;
	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	/** blur event for onTouchedFn */
	@Output() blur = new EventEmitter<null>();
	/** editable field ref, used to close it programmatically */
	@ViewChild('editable') editable: EditableTextComponent;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: string;
	/** whether the editable is open */
	@Input() isOpen = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		// saving the starting value in the accumulator so
		// if we do a save without typing anything the field won't be undefined
		// TODO: this should be done in the setter instead
		this.accumulator = this.customField.value;
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
