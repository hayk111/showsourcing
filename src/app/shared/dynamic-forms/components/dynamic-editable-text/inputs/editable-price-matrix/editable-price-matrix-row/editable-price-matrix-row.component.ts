import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceMatrixRow } from '~models';
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

	accumulator: PriceMatrixRow;
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

	onClose(isCancel: boolean) {
		if (isCancel) return;

		this.value = this.accumulator;
		/** close currency selector in case it's still open */
		this.isOpen = false;
		this.onChange();
		this.closed.emit();
	}

	onSelectorChange() {
		this.onChange();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
		// prevent view has changed after it was checked error
		this.cd.detectChanges();
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
