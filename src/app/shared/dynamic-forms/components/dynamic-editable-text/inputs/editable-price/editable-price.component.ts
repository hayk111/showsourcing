import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { makeAccessorProvider, AbstractInput, InputDirective } from '~shared/inputs';
import { CustomField } from '~shared/dynamic-forms/models';
import { Price } from '~models';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { EditableTextComponent } from '~shared/editable-field';

@Component({
	selector: 'editable-price-app',
	templateUrl: './editable-price.component.html',
	styleUrls: ['./editable-price.component.scss', '../../common-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceComponent)]
})
export class EditablePriceComponent extends AbstractInput {
	@Input() inlineLabel: boolean;
	@Input() customField: CustomField;
	@Output() change = new EventEmitter();
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

	onSave() {
		this.value = this.accumulator;
		this.isOpen = false;
		this.onChange();
	}

	onOpen() {
		this.isOpen = true;
	}

	accumulatePrice(priceAmount: number) {
		this.accumulator.value = priceAmount;
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
		// change only happens when the field closes
	}

	onCurrencyChange() {
		this.isOpen = false;
		this.onChange();
		this.currencyEditable.close();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	showCurrencySelector() {
		this.currencySelectorShown = true;
	}

	hideCurrencySelector() {
		this.currencySelectorShown = false;
	}

}
