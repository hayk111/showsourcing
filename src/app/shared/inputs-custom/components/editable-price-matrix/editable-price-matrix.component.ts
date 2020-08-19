import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
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

	@Input()
	set value(v: Price[]) {
		this._value = v || [{}];
	}
	get value() { return this._value; }
	private _value: Price[];

	@Output() saved = new EventEmitter<undefined>();

	addPrice() {
		this.value.push({});
		this.saved.emit();
	}

	removePrice() {
		this.value.splice(this.value.length - 1, 1);
		this.saved.emit();
	}
}
