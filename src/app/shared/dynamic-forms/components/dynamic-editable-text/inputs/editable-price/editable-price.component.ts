import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { makeAccessorProvider, AbstractInput, InputDirective } from '~shared/inputs';
import { CustomField } from '~shared/dynamic-forms/models';
import { Price } from '~models';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

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
	isOpen: boolean;
	accumulator;

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
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

}
