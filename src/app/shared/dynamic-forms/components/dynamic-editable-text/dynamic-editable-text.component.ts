import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-editable-text-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)],
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class DynamicEditableTextComponent extends AbstractInput implements AfterViewInit {
	@Input() customField: CustomField;
	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	/** blur event for onTouchedFn */
	@Output() blur = new EventEmitter<null>();
	@Output() update = new EventEmitter<DynamicUpdate>();
	/** editable field ref, used to close it programmatically */
	@ViewChild('editable') editable: EditableTextComponent;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;
	/** whenever someone cancels an input this flag goes true */
	isCancel = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngAfterViewInit() {
		// saving the starting value in the accumulator so
		// if we do a save without typing anything the field won't be undefined
		this.accumulator = this.value;
	}

	/** saves the value because an user might cancel */
	accumulate(value: any) {
		this.accumulator = value;
		this.onChange();
	}

	onClose(isCancel) {
		if (!isCancel) {
			this.onSave();
		}
	}

	/** saving the value */
	onSave() {
		// do nothing when no changes made
		if (this.value === this.accumulator)
			return;
		this.value = this.accumulator;
		this.onChange();
		this.update.emit({ [this.customField.name]: this.value });
	}


	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.value;
	}

	/** when the value changes */
	onChange() {
		this.customField.value = this.value;
		this.onChangeFn(this.value);
	}

	/** on blur we need to call onTouchedFn to not have errors of change detection */
	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	/** toggle input value from true to false and vice versa */
	toggleValue() {
		this.accumulator = !this.accumulator;
		this.onSave();
	}

}
