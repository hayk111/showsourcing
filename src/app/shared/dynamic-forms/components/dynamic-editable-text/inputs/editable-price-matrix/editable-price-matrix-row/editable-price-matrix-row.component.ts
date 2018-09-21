import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { PriceMatrixRow } from '~models';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'editable-price-matrix-row-app',
	templateUrl: './editable-price-matrix-row.component.html',
	styleUrls: ['./editable-price-matrix-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceMatrixRowComponent)]
})
export class EditablePriceMatrixRowComponent extends AbstractInput {
	@Input() set value(v: PriceMatrixRow) {
		this._value = v || new PriceMatrixRow();
		this.accumulator = this.value;
	}
	get value() { return this._value; }
	private _value;
	@Output() change = new EventEmitter<PriceMatrixRow>();
	@Output() blur = new EventEmitter();
	@Output() closed = new EventEmitter();

	@ViewChild(SelectorConstComponent) selector: SelectorConstComponent;
	accumulator: PriceMatrixRow;
	selectorShown = false;
	isOpen = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	accumulate(type: 'price' | 'label', value: any) {
		if (type === 'price')
			this.accumulator.price = value;
		if (type === 'label')
			this.accumulator.label = value;
	}

	save() {
		this.value = this.accumulator;
		/** close currency selector in case it's still open */
		this.closeSelector();
		this.isOpen = false;
		this.onChange();
		this.closed.emit();
	}

	openSelector() {
		this.selectorShown = true;
		setTimeout(_ => this.selector.open());
	}

	closeSelector() {
		this.selectorShown = false;
	}

	onSelectorChange() {
		this.onChange();
		this.closeSelector();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	onChange() {
		this.change.emit();
		this.onChangeFn(this.value);
	}

	onOpen() {
		this.isOpen = true;
	}

	get currency() {
		if (this.value && this.value.price)
			return this.value.price.currency;
	}

	set currency(curr: string) {
		this.value.price.currency = curr;
	}

	get amount() {
		if (this.value && this.value.price) {
			return this.value.price.value / 10000;
		}
	}

	set amount(v: number) {
		this.value.price.value = v * 10000;
	}
}
