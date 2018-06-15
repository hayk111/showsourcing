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
export class EditablePriceMatrixComponent extends AbstractInput {
	@Output() change = new EventEmitter<PriceMatrix>();
	@Output() blur = new EventEmitter<null>();
	@Input() value: PriceMatrix;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
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

}
