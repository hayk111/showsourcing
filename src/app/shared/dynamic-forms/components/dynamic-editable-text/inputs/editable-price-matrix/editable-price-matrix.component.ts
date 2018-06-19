import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceMatrix, PriceMatrixRow } from '~models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

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


	onChange(row: PriceMatrixRow, index: number) {
		this.value[index] = row;
		this.onChangeFn(this.value);
		this.change.emit();
	}

	addRow() {
		if (!this.value)
			this.value = new PriceMatrix();
		// creating a new row
		this.value.rows = this.value.rows.concat(new PriceMatrixRow());
		this.onChangeFn(this.value);
		this.change.emit();
	}

}
