import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { Price } from '~models';
import { DynamicField } from '~shared/dynamic-forms/models';
import { EditableTextComponent } from '~shared/editable-field';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'editable-price-app',
	templateUrl: './editable-price.component.html',
	styleUrls: ['./editable-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceComponent)],
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class EditablePriceComponent extends AbstractInput {
	@Input() inlineLabel: boolean;
	@Input() customField: DynamicField;
	@Output() change = new EventEmitter();
	@Output() open = new EventEmitter();
	@Output() close = new EventEmitter();
	@Output() blur = new EventEmitter();
	@ViewChild('editable2') currencyEditable: EditableTextComponent;
	isOpen: boolean;
	accumulator;
	currencySelectorShown: boolean;

	@Input() set value(v: Price) {
		this._value = v || new Price({});
		this.accumulator = this._value;
	}
	get value(): Price { return this._value; }
	private _value: Price = {};

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	onClose(isCancel: boolean) {
		if (isCancel) return;
		this.value = this.accumulator;
		this.onChange();
		this.isOpen = false;
		this.close.emit();
	}

	onOpen() {
		this.isOpen = true;
		this.open.emit();
	}

	accumulatePrice(priceAmount: number) {
		// price is displayed as 10000 times less than what is saved
		this.accumulator.value = priceAmount * 10000;
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
		// change only happens when the field closes
	}

	onCurrencyChange() {
		this.isOpen = false;
		this.onChange();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	get amount() {
		return this.value.value / 10000;
	}

	get currency() {
		return this.value.currency;
	}

}
