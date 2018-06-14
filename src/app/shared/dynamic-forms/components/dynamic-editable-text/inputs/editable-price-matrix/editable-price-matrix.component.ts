import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, Input, ViewChild, OnInit } from '@angular/core';
import { PriceMatrix, Price, PriceMatrixRow } from '~models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { uuid } from '~utils';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';

@Component({
	selector: 'editable-price-matrix-app',
	templateUrl: './editable-price-matrix.component.html',
	styleUrls: ['./editable-price-matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceMatrixComponent)],
})
export class EditablePriceMatrixComponent extends AbstractInput implements OnInit {
	@Output() change = new EventEmitter<PriceMatrix>();
	@Output() blur = new EventEmitter<null>();
	@Input() value: PriceMatrix;
	@ViewChild(SelectorConstComponent) selectorCurrency: SelectorConstComponent;
	private accumulator: PriceMatrixRow[] = [];
	selectorShown = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.accumulator = this.value.rows;
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit();
	}

	addRow() {
		if (!this.value)
			this.value = new PriceMatrix();
		// creating a new row
		this.value.rows = this.value.rows.concat(new PriceMatrixRow());
		this.onChange();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	accumulate(type: 'price' | 'label', value: any, i: number) {
		this.accumulator = [...this.value.rows];
		if (type === 'price')
			this.accumulator[i].price.value = value;
		if (type === 'label')
			this.accumulator[i].label = value;
	}

	save() {
		this.value = {
			...this.value,
			rows: this.accumulator
		};
		this.onChange();
	}

	onSelectorChange() {
		this.onChange();
		this.closeSelector();
	}

	openSelector() {
		this.selectorShown = true;
		setTimeout(_ => { this.selectorCurrency.open(); });
	}

	closeSelector() {
		this.selectorShown = false;
	}
}
