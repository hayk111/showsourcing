import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {
	EntityMetadata,
	ERM,
	ExtendedField,
	ExtendedFieldDefinition,
	ExtendedFieldDefinitionMetadata,
	Packaging,
	Price,
} from '~core/models';




/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'extended-form-input-app',
	templateUrl: './extended-form-input.component.html',
	styleUrls: ['./extended-form-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class ExtendedFormInputComponent implements OnInit {

	@Input() type: EntityMetadata;
	@Input() set field(field: ExtendedField) {
		if (!field)
			field = new ExtendedField();
		this._field = field;
		this.accumulator = field.value;
	}
	get field() { return this._field; }
	private _field: ExtendedField;

	private _definition: ExtendedFieldDefinition;
	@Input() set definition(definition: ExtendedFieldDefinition) {
		this._definition = definition;
		if (this._definition && this._definition.metadata)
			this.metadata = JSON.parse(this._definition.metadata);
	}
	get definition() {
		return this._definition;
	}
	@Input() disabled = false;
	@Input() autofocus = false;

	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	@Input() isFormStyle = false;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	@Output() update = new EventEmitter<ExtendedField>();
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;

	inputValue$ = new Subject<({ value: any, isJson: boolean })>();
	metadata: ExtendedFieldDefinitionMetadata;

	ngOnInit() {
		this.inputValue$.pipe(
			debounceTime(250),
			distinctUntilChanged(),
			tap(item => item.isJson ? this.accumulateJSON(item.value) : this.accumulator = item.value),
			tap(_ => this.onClose(false))
		).subscribe();
	}

	onClose(isCancel: boolean) {
		if (!isCancel) {
			this.onSave();
		}
	}

	getERM(name) {
		return ERM.getEntityMetadata(name) || null;
	}

	getLinkingObject() {
		throw Error('linkingobject selector hasn\'t been implemented');
	}

	/** saving the value */
	onSave() {
		this.field.value = this.accumulator;
		let definition;
		definition = new ExtendedFieldDefinition({ id: this.definition.id });
		this.update.emit({ ...this.field, definition });
	}

	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.field.value;
	}

	onInput(value: any, isJson = false) {
		this.inputValue$.next({ value, isJson });
	}

	/** toggle input value from true to false and vice versa */
	toggleBoolean(check) {
		if (this.disabled)
			return;
		// we need this condition, cause when the accumulator is empty we need to take the value of the event
		if (!this.accumulator)
			this.accumulator = check ? 'true' : 'false';
		else
			this.accumulator = this.accumulator === 'true' ? 'false' : 'true';
		this.onSave();
	}

	isText(type: string) {
		return type === 'text' || type === 'decimal' || type === 'tel' || type === 'number';
	}

	getObject() {
		return this.accumulator ? JSON.parse(this.accumulator) : undefined;
	}

	accumulateJSON(json: Price | Packaging) {
		// we need to stringify it since it's stored as a string
		this.accumulator = JSON.stringify(json);
	}

}
