import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../abstract-input.class';
import { Price } from '~core/erm3';
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
}
