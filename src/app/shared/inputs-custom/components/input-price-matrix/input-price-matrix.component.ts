import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Price } from '~core/erm3';
import { AbstractInput, makeAccessorProvider } from '../abstract-input.class';

@Component({
	selector: 'input-price-matrix-app',
	templateUrl: './input-price-matrix.component.html',
	styleUrls: ['./input-price-matrix.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(InputPriceMatrixComponent)]
})
export class InputPriceMatrixComponent extends AbstractInput {
	@Input() value: Price[] = [{}];

	addRow() {
		if (!this.readonly && !this.disabled) {
			this.value.push({});
		}
	}

	removePrice() {
		this.value.splice(this.value.length - 1, 1);
	}
}
