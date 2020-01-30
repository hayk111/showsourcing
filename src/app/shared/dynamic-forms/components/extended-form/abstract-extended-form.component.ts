import { AfterViewInit, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import {
	EntityMetadata,
	ERM,
	ExtendedField,
	ExtendedFieldDefinition,
	ExtendedFieldDefinitionMetadata,
	Packaging,
	Price,
} from '~core/ORM/models';
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
			// here we could use metadata.type and check if its custom, but since the selectors atm work
			// with erm only we won't use it until its required in the app
			this.accumulator = this.metadata && this.metadata.source && this.getERM(this.metadata.source) === ERM.SELECTOR_ELEMENT ?
				this._field.selectorValue : this._field.value;
		}
	}

	/**
	 * if isCanel is false it will save, nothing otherwise
	 * @param isCancel boolean that determines if we use cancel action or not
	 */
	onClose(isCancel: boolean) {
		if (!isCancel) {
			this.onSave();
		}
	}

	/**
	 * get erm based on a name
	 * @param name name to fetch on the ERM class
	 * @returns an ERM or null
	 */
	getERM(name) {
		return ERM.getEntityMetadata(name) || null;
	}

	/**
	 * emits a ExtendedField object with the latest values modified
	*/
	onSave() {
		// here we could use metadata.type and check if its custom, but since the selectors atm work
		// with erm only we won't use it until its required in the app
		if (this.metadata && this.metadata.source && this.getERM(this.metadata.source) === ERM.SELECTOR_ELEMENT) {
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

	/**
	 * adds the latest value to the accumulator and calls onClose(false)
	 * @param value current value
	 * @param transformToJson determine if the next value is an Object that needs to be transformed into a string
	 */
	onInput(value: any, transformToJson = false) {
		transformToJson ? this.accumulateObjectToString(value) : this.accumulator = value;
		this.onClose(false);
	}

	// since the value comes in a form of a string (extendedField.value), we have to translate it into a boolean
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

	// we only use this kind of function with Price & Packaging since their value is a string that needs to be transformed to object
	/**
	 * converts the string on the accumulator on Object format
	 */
	stringToObject() {
		return this.accumulator ? JSON.parse(this.accumulator) : undefined;
	}

	// we only use this kind of function with Price & Packaging since their value is a string that needs to be transformed to object
	/**
	 * transforms an object into a string
	 * @param json object to be transformed into string
	 */
	accumulateObjectToString(json: Price | Packaging) {
		// we need to stringify it since it's stored as a string+
		this.accumulator = JSON.stringify(json);
	}
}
