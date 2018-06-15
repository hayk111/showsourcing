import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { PriceMatrixRow } from '~models';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { AbstractInput } from '~shared/inputs';

@Component({
	selector: 'editable-price-matrix-row-app',
	templateUrl: './editable-price-matrix-row.component.html',
	styleUrls: ['./editable-price-matrix-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [EditablePriceMatrixRowComponent]
})
export class EditablePriceMatrixRowComponent extends AbstractInput implements OnInit {
	@Input() row: PriceMatrixRow;
	@Output() change = new EventEmitter<PriceMatrixRow>();
	@ViewChild(SelectorConstComponent) selector: SelectorConstComponent;
	accumulator: PriceMatrixRow;
	selectorShown = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.accumulator = this.value.rows;
	}

	accumulate(type: 'price' | 'label', value: any) {
		this.accumulator = this.row;
		if (type === 'price')
			this.accumulator.price.value = value;
		if (type === 'label')
			this.accumulator.label = value;
	}

	save() {
		this.value = this.accumulator;
		this.onChangeFn(this.value);
		/** close currency selector in case it's still open */
		this.closeSelector();
	}

	openSelector() {
		this.selectorShown = true;
		this.selector.open();
	}

	closeSelector() {
		this.selectorShown = false;
	}

	onSelectorChange() {
		this.onChangeFn(this.value);
		this.closeSelector();
	}
}
