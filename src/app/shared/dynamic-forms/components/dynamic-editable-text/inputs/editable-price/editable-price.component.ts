import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { makeAccessorProvider, AbstractInput, InputDirective } from '~shared/inputs';
import { CustomField } from '~shared/dynamic-forms/models';
import { Price } from '~models';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

@Component({
	selector: 'editable-price-app',
	templateUrl: './editable-price.component.html',
	styleUrls: ['./editable-price.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceComponent)]
})
export class EditablePriceComponent extends AbstractInput implements OnInit {
	@Input() inlineLabel: boolean;
	@Input() customField: CustomField;
	@Output() change = new EventEmitter<Price>();
	isOpen: boolean;
	accumulator;

	@Input() set value(v: Price) { this._value = v || {}; }
	get value(): Price { return this._value; }
	private _value = {};



	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.accumulator = this.value.value;
	}

	onSave() {
		this.value.value = this.accumulator.value;
		this.onChange();
	}

	onOpen() {
		this.isOpen = true;
	}

	accumulatePrice(priceAmount: number) {
		this.value.value = priceAmount;
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

}
