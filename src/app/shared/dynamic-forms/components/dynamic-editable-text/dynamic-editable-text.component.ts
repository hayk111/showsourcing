import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Packaging, Price } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms/models';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';
import { EditableContainerComponent } from '~shared/editable-field';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-editable-container-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)],
	host: {
		'[class.oneLine]': 'config.inlineLabel',
		'[class.twoLine]': '!config.inlineLabel'
	}
})
export class DynamicEditableTextComponent extends AbstractInput {
	@Input() config: DynamicFormConfig;
	/** number that specify what index is an input in its column */
	@Input() indexInCol: number;
	@Input() set value(v: any) {
		this._value = v;
		this.accumulator = v;
	}
	get value() {
		return this._value;
	}
	private _value: any;
	@Input() customField: DynamicField;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	/** blur event for onTouchedFn */
	@Output() blur = new EventEmitter<null>();
	@Output() update = new EventEmitter<DynamicUpdate>();
	/** editable field ref, used to close it programmatically */
	@ViewChild('editable', { static: false }) editable: EditableContainerComponent;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;
	/** whenever someone cancels an input this flag goes true */
	isCancel = false;

	constructor(protected cd: ChangeDetectorRef, public translate: TranslateService) {
		super(cd);
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
	onSave(isAccumulated = true) {
		const type = this.customField.type;
		// do nothing when no changes made, we don't need this condition for the types that do not use accumulator
		if ((type !== 'selector' && type !== 'boolean') && this.value === this.accumulator)
			return;
		if (isAccumulated)
			this._value = this.accumulator;
		this.onChange();
		this.update.emit({ [this.customField.name]: this.value });
	}

	/** when the user cancels we put the previous value back in because onClose is gonna be called */
	onCancel() {
		this.accumulator = this.value;
	}

	/** when the value changes */
	onChange() {
		this.onChangeFn(this.value);
	}

	/** on blur we need to call onTouchedFn to not have errors of change detection */
	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	/**
	 * toggle input value from true to false and vice versa if the type of target of the event is not 'radio'
	 * @param event mouse click event
	 */
	toggleValue(event) {
		// since the radio-app already handles click, what this part handles
		// is the click on the editable-container-app, since the radio is inside the editable, we have to check
		// that the target type is not radio, that means that we are not clicking the radio component but outside
		if (event && event.target.type !== 'radio') {
			this.accumulator = !this.accumulator;
			this.onSave();
		}
	}

	getMetadata(metadata) {
		const stringConstructor = 'string'.constructor;
		const objectConstructor = ({}).constructor;
		// we check if the metadata has to be trasnformed into an Object
		if (metadata.constructor === stringConstructor) {
			const objMetadata = JSON.parse(metadata);
			return objMetadata ? objMetadata.source : null;
		} else if (metadata.constructor === objectConstructor) { // if tis already an object, we return the target if exists
			return metadata && metadata.target || null;
		}
		return null;
	}

	// we only use this kind of function with Price & Packaging when objectAsString input is true
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
		this.accumulate(JSON.stringify(json));
	}

}
