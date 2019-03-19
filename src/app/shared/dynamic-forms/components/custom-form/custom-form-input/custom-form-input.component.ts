import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ExtendedFieldDefinition, Price, RequestField, RequestFieldDefinition } from '~core/models';
import { ExtendedField } from '~core/models/extended-field.model';
import { CustomField, CustomFieldDefinition } from '~shared/dynamic-forms/models';



/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'custom-form-input-app',
	templateUrl: './custom-form-input.component.html',
	styleUrls: ['./custom-form-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class CustomFormInputComponent {

	@Input() set field(field: CustomField) {
		if (!field) {
			switch (field.constructor.name) {
				case ExtendedField.name:
					field = new ExtendedField();
					break;
				case RequestField.name:
					field = new RequestField();
					break;
				default:
					throw Error(`Unsuported field type (${field.constructor.name}) for custom form input`);
			}
		}
		this._field = field;
		this.accumulator = field.value;
	}
	get field() { return this._field; }
	private _field: CustomField;

	@Input() definition: CustomFieldDefinition;

	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	@Output() update = new EventEmitter<CustomField>();
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
		let definition;
		switch (this.field.constructor.name) {
			case ExtendedField.name:
				definition = new ExtendedFieldDefinition({ id: this.definition.id });
				break;
			case RequestField.name:
				definition = new RequestFieldDefinition({ id: this.definition.id });
				break;
			default:
				throw Error(`Unsuported definition field type (${this.field.constructor.name}) for custom form input`);
		}
		this.update.emit({ ...this.field, definition });
	}

	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.field.value;
	}

	/** toggle input value from true to false and vice versa */
	toggleBoolean() {
		if (this.accumulator === 'yes')
			this.accumulator = 'no';
		else
			this.accumulator = 'yes';
		this.onSave();
	}

	isText(type: string) {
		return type === 'text' || type === 'decimal' || type === 'tel' || type === 'number';
	}

	getPrice() {
		return this.accumulator ? JSON.parse(this.accumulator) : undefined;
	}

	accumulatePrice(price: Price) {
		// we need to stringify it since it's stored as a string
		this.accumulator = JSON.stringify(price);

	}

}
