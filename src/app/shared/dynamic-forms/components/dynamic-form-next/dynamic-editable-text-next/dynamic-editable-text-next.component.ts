import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { ExtendedField } from '~core/models/extended-field.model';
import { ExtendedFieldDefinition } from '~core/models';


/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-editable-text-next-app',
	templateUrl: './dynamic-editable-text-next.component.html',
	styleUrls: ['./dynamic-editable-text-next.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class DynamicEditableTextNextComponent {

	@Input() set field(field: ExtendedField) {
		if (!field)
			field = new ExtendedField();
		this._field = field;
		this.accumulator = field.value;
	}
	get field() { return this._field; }
	private _field: ExtendedField;

	@Input() definition: ExtendedFieldDefinition;

	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	@Output() update = new EventEmitter<ExtendedField>();
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;

	onClose(isCancel: boolean) {
		if (!isCancel) {
			this.onSave();
		}
	}

	/** saving the value */
	onSave() {
		this.field.value = this.accumulator;
		this.update.emit(this.field);
	}

	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.field.value;
	}

	/** toggle input value from true to false and vice versa */
	toggleValue() {
		this.accumulator = !this.accumulator;
		this.onSave();
	}

}
