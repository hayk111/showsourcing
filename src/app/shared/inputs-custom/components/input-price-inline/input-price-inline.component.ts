import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Price } from '~models';

@Component({
	selector: 'input-price-inline-app',
	templateUrl: './input-price-inline.component.html',
	styleUrls: ['./input-price-inline.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPriceInlineComponent implements OnInit {

	private _price: Price = new Price({ value: 0, currency: 'USD' });
	@Input()
	set price(price: Price) { if (price) this._price = { ...price }; }
	get price() { return this._price; }


	constructor() { }

	ngOnInit() {
	}


	get amount() {
		return this.price.value / 10000;
	}

	set amount(amount: any) {
		amount = amount.replace(',', '.');
		this.price.value = amount * 10000;
	}

	get currency() {
		return this.price.currency;
	}

	set currency(currencyId: string) {
		this.price.currency = currencyId;
	}

	updateCurrency(item) {
		this.price.currency = item;
	}

}
