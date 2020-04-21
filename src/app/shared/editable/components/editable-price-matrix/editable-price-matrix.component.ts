import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { Price } from '~core/erm3';



@Component({
	selector: 'editable-price-matrix-app',
	templateUrl: './editable-price-matrix.component.html',
	styleUrls: ['./editable-price-matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePriceMatrixComponent)]
})
export class EditablePriceMatrixComponent extends AbstractInput {
	private openedCell: number[] = [];

	@Input()
	set value(v: Price[]) {
		this._value = v || [{}];
	}
	get value() { return this._value; }
	private _value: Price[];

	addPrice() {
		this.value.push({});
	}

	closeCell(row: number, col: number) {
		this.openedCell = [];
	}

	openCell(row: number, col: number) {
		this.openedCell[0] = row;
		this.openedCell[1] = col;
	}

	isCellOpened(row: number, col: number) {
		return this.openedCell[0] === row && this.openedCell[1] === col;
	}

	isCellClosed(row: number, col: number) {
		return !this.isCellOpened(row, col);
	}
}
