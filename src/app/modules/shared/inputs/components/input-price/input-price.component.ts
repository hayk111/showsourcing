import { AbstractInput } from '../../abstract-input.class';
import { Injector, Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
	selector: 'input-price-app',
	templateUrl: './input-price.component.html',
	styleUrls: ['./input-price.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputPriceComponent),
			multi: true
		}
	]
})
export class InputPriceComponent extends AbstractInput {
	@Output() update = new EventEmitter<any>();

	constructor(protected inj: Injector) {
		super(inj);
		this.value = { priceAmount: 0, priceCurrency: {}};
	}

	onPriceChange(value) {
		const s = { priceAmount: value, priceCurrency: this.value.priceCurrency };
		this.update.emit(s);
	}

	onCurrencyChange(value) {
		const s = { priceAmount: this.value.priceAmount, priceCurrency: value };
		this.update.emit(s);
	}
}
