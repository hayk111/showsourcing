import { Pipe, PipeTransform, LOCALE_ID, Inject } from '@angular/core';
import { Price } from '~core/models';
import { CurrencyPipe } from '@angular/common';

@Pipe({
	name: 'appPrice'
})
export class PricePipe implements PipeTransform {

	transform(price: Price | number, roundedTo = 2): any {
		debugger;
		let value: number | string = price instanceof Object ? price.value : price;
		if (!isNaN(value)) {
			value = Number((value / 10000).toFixed(roundedTo));
		} else {
			value = '-';
		}
		if (price instanceof Object) {
			const currencyPipe = new CurrencyPipe(this._locale);
			return currencyPipe.transform(value, price.currency, 'symbol-narrow', '1.0-2');
		} else {
			return value;
		}
	}

	constructor(@Inject(LOCALE_ID) private _locale: string) { }
}
