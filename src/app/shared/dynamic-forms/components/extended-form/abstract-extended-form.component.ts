import { AfterViewInit, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import {
	EntityMetadata,
	ERM,
	ExtendedField,
	ExtendedFieldDefinition,
	ExtendedFieldDefinitionMetadata,
	Packaging,
	Price,
} from '~core/models';
import { FormFieldComponent } from '~shared/inputs';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
export abstract class AbstractExtendedFormComponent implements AfterViewInit, OnChanges {
	@Input() type: EntityMetadata;
	@Input() set field(field: ExtendedField) {
		if (!field)
			field = new ExtendedField();
		this._field = field;
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

	@Output() update = new EventEmitter<ExtendedField>();

	/** allows us to check the width of each form field */
	@ViewChild(FormFieldComponent, { static: false, read: ElementRef }) formField: ElementRef;
	/** width used for the selectors */
	width: number;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;

	metadata: ExtendedFieldDefinitionMetadata;

	ngAfterViewInit() {
		// this way the selector has the same width as the form itself
		if (this.formField) {
			this.width = this.formField.nativeElement.clientWidth || null;
		}
	}

	ngOnChanges(change) {
		// since we need the metadata from the definition we do this check on ngChanges, this way we ensure
		// that we have the latest metadata
		if (change.field) {
			// WIP TODO add an interface or variable to this 'custom'
			this.accumulator = this.metadata && this.metadata.type === 'custom' ?
				this._field.selectorValue : this._field.value;
		}
	}

	onClose(isCancel: boolean) {
		if (!isCancel) {
			this.onSave();
		}
	}

	getERM(name) {
		return ERM.getEntityMetadata(name) || null;
	}

	/** saving the value */
	onSave() {
		// WIP TODO add an interface or variable to this 'custom'
		if (this.metadata && this.metadata.type === 'custom') {
			// in the case the values are multiple, thhe selector will automatically send us back an array
			// otherwise we have to trasnform it into one
			this.field.selectorValue = this.metadata.multiple ? this.accumulator : [this.accumulator];
		} else
			this.field.value = this.accumulator;
		let definition;
		definition = { id: this.definition.id, __typename: this.definition.__typename };
		this.update.emit({ ...this.field, definition });
	}

	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.field.value;
	}

	onInput(value: any, isJson = false) {
		isJson ? this.accumulateJSON(value) : this.accumulator = value;
		this.onClose(false);
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

	getObject() {
		return this.accumulator ? JSON.parse(this.accumulator) : undefined;
	}

	// we use this method when we have to send as a value a json (not applicable ofr selectors)
	accumulateJSON(json: Price | Packaging) {
		// we need to stringify it since it's stored as a string+
		this.accumulator = JSON.stringify(json);
	}
}
