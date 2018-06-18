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
export class EditablePriceMatrixRowComponent extends AbstractInput implements OnInit {
	@Input() set value(v: PriceMatrixRow) { this._value = v || new PriceMatrixRow(); }
	get value() { return this._value; }
	private _value;
	@Output() change = new EventEmitter<PriceMatrixRow>();
	@Output() blur = new EventEmitter<null>();
	@ViewChild(SelectorConstComponent) selector: SelectorConstComponent;
	accumulator: PriceMatrixRow;
	selectorShown = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.accumulator = this.value;
	}

	accumulate(type: 'price' | 'label', value: any) {
		this.accumulator = this.value;
		if (type === 'price')
			this.accumulator.price.value = value;
		if (type === 'label')
			this.accumulator.label = value;
	}

	save() {
		this.value = this.accumulator;
		this.onChange();
		/** close currency selector in case it's still open */
		this.closeSelector();
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
}
